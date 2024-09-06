import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Kolkata,Mumbai,Delhi"
  );
 console.log(data)
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://i.pinimg.com/564x/22/18/dc/2218dc7692f2d2fab2f3d7d784f490db.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[0]} hospitals</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvkLoZZmyMqGUnYJJo5uqaAxbkySxUARbZyw&s"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data[1]} hospitals</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://content.jdmagicbox.com/comp/kolkata/j2/033pxx33.xx33.130828153006.j9j2/catalogue/ruby-general-hospital-ltd-east-kolkata-township-kolkata-hospitals-1oc9ttwhkx.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Kolkata</h1>
              <h2>{data[2]} hospitals</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
