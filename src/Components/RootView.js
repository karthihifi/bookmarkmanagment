import { Component, useEffect, useState } from "react";
import axios from "axios";
import Card from "./FolderCard";

const baseURL =
  "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder";
const headers = { "content-type": "application/json;odata.metadata=minimal" };

const baseUrlCategories = "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/VH_categories"
// 'Access-Control-Allow-Origin' : 'http://localhost:3000' }

const RootView = () => {
  const [Categories, setCategories] = useState([]);
  const [FullData, setFullData] = useState([]);
  const [CategoriesHelp, setCategoriesHelp ] = useState([]);

  const updateCategories = (fulldata) => {
    let catgories = [];
    let catTemp = [];

    for (let i = 0; i < fulldata.length; i++) {
      catTemp.push(fulldata[i].maincategory);
    }
    catgories = [...new Set(catTemp)];
    setCategories(catgories);
    console.log(FullData);
  };

  useEffect(() => {
    const FolderUrl = axios.get(baseURL);
    const CategoriesUrl = axios.get(baseUrlCategories);
    let CategoriesHelp = []

    axios.all([FolderUrl, CategoriesUrl]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      console.log("test val",Object.values(responseTwo.data.value)[0].maincategory)
      Object.values(responseTwo.data.value).forEach((item) => CategoriesHelp.push(item.maincategory))
      setFullData(responses[0].data.value);
      updateCategories(responses[0].data.value);
      setCategoriesHelp(CategoriesHelp)
    })).catch(errors => {
      // react on errors.
    })

    // axios.get(baseURL, { headers }).then((resp) => {
    //   setFullData(resp.data.value);
    //   updateCategories(resp.data.value);
    // });
  }, []);

  // const updatedCategories = Categories.map((cat) => {
  //   return <li>{cat}</li>;
  // });

  return (
    <div>
      {/* <header className="grid-header">
        <h2>Categories</h2>
      </header> */}
      <div>
        {Categories.map((name) => (
          <div>
            <div className = "grid-item_header">{name}</div>
            <Card maincategory={name} categoryHelp = {CategoriesHelp} fulldata={FullData}></Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RootView;
