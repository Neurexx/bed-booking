import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/beds/getByType?type=ICU,General");
 console.log(data)
  const images = [
    "https://tmckolkata.com/in/wp-content/uploads/2021/05/icu8.jpg",
   "https://3.imimg.com/data3/YT/HI/MY-9780834/1-500x500.jpg",
   "https://elmcindia.org/assets/images/emergency.jpg"
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
