const Product = require("../models/models.js");
const getAllProductsStatic = async (req, res) => {
 const products = await Product.find({price:{$gt:30}}).sort("name -price");
  res.status(200).json({nbHits: products.length , products});
}

const getAllProducts = async (req, res) => {
  // console.log(req.query);
  const { featured, company, name, sort,fields,numericFilters} = req.query;
  const queryObject = {};
  if (featured) {
    //this thing bcoz query params are always string so we need to convert it into boolean
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if(name){
    queryObject.name = {$regex:name,$options:"i"}; //this is for case insensitive search
  }
  if(numericFilters){
    const operatorMap={
      ">":"$gt",//gt = greater than
      ">=":"$gte",//gte = greater than or equal to
      "=":"$eq",//eq = equal to
      "<":"$lt",//lt = less than
      "<=":"$lte"//lte = less than or equal to
    };
    const regEx=/\b(<|>|>=|=|<|<=)\b/g;
    let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
  //  console.log(filters);
  const options=["price","rating"];
  filters=filters.split(",").forEach((item)=>{
      const [field,operator,value]=item.split("-");
      queryObject[field]={...queryObject[field],...{[operator]:Number(value)}};
    if(options.includes(field)){
      queryObject[field]={...queryObject[field],...{[operator]:Number(value)}};
    }
    }); 
   
  }
  let result= Product.find(queryObject);
  if(sort){
   const sortList=sort.split(",").join(" ");
  //  console.log(sortList)
   result=result.sort(sortList);
  }
  else{
    result=result.sort("createdAt");
  }
  if(fields){
    //lets the user choose which fields they want in the response
    const fieldsList=fields.split(",").join(" ");
    result=result.select(fieldsList);
  }

  // pagination
  //   .skip(n) skips the first n documents.
  // .limit(n) returns at most n documents after that.
  const page=Number(req.query.page) || 1;
  const limit=Number(req.query.limit) || 3;
  const skip=(page-1)*limit;
  result=result.skip(skip).limit(limit);
  const products = await result;
const totalProducts = await Product.countDocuments(queryObject  );//This line counts how many products match your filter in the database.
res.status(200).json({
  nbHits: products.length,
  totalProducts,
  totalPages: Math.ceil(totalProducts / limit),
  currentPage: page,
  products,
});
  // A Mongoose query is not a result yet.
  //  It is like a plan that you can keep adding to. 
  // It only runs when you await it.
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};