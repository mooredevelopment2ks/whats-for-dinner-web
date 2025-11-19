import domain from "@/assets/domain.png";
import thumbUp1 from "@/assets/thumbUp1.png";
import thumbUp2 from "@/assets/thumbUp2.png";
import thumbUp3 from "@/assets/thumbUp3.png";
import cheap from "@/assets/cheap.png";
import moderate from "@/assets/moderate.png";
import expensive from "@/assets/expensive.png";
import placeholder from "@/assets/placeholder.png";
import veryExpensive from "@/assets/veryExpensive.png";
import Image from "next/image";

export default function Results({ place, handleTryAgain }) {
  const pref = place.photos[0]?.prefix;
  const suff = place.photos[0]?.suffix;
  const imgURL = pref && suff ? `${pref}200x200${suff}` : null;

  return (
    <div className="results-box">
      <div className="top">
        <div className="marquee">
          <p>{place.name}</p>
          {imgURL ? (
            <Image
              className="rimg"
              src={imgURL}
              width={200}
              height={200}
              alt={place.name}
            />
          ) : (
            <Image
              src={placeholder}
              width={200}
              height={200}
              alt={place.name}
            />
          )}
        </div>
        <div className="details">
          <ul>
            <li>Address: {place.location.formatted_address}</li>
            <li>Hours: {place.hours.display}</li>
            <li>Phone: {place.tel}</li>
            <li>
              <span className="resultSpan">
                <a href={place.website}>
                  <Image src={domain} width={50} alt={place.website} />
                </a>
              </span>
              <span className="resultSpan">
                {place.rating >= 6.7 ? (
                  <Image src={thumbUp3} width={50} alt="thumb up" />
                ) : place.rating >= 3.4 ? (
                  <Image src={thumbUp2} width={50} alt="thumb up" />
                ) : (
                  <Image src={thumbUp1} width={50} alt="thumb up" />
                )}
              </span>
              <span className="resultSpan">
                {place.price === 1 ? (
                  <Image src={cheap} width={50} alt="cheap" />
                ) : place.price === 2 ? (
                  <Image src={moderate} width={50} alt="moderate" />
                ) : place.price === 3 ? (
                  <Image src={expensive} width={50} alt="expensive" />
                ) : (
                  <Image src={veryExpensive} width={50} alt="very expensive" />
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="buttons">
        <button className="btn" onClick={handleTryAgain}>
          Try Again
        </button>
        <button
          className="btn"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                place.location.formatted_address
              )}`,
              "_blank"
            )
          }
        >
          Directions
        </button>
      </div>
    </div>
  );
}
