import Image from "next/image";
import backgroundImage from "../../assets/backgroundImage.jpg";

const BackGroundImage = () => {
  return <Image layout="responsive" src={backgroundImage}></Image>;
};

export default BackGroundImage;
