// importer app.js
const app =require("./back-end/app");
// BE server is listening on http://localhost:3000
app.listen(3000,()=>  {

    console.log("Express Application is listenning on Port 3000 ....");
});
