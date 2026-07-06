
import { CSSProperties, Fragment } from "react";
import { ClipLoader, FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className='flex justify-center align-middle my-24'>
    <FadeLoader
        color="#2b7fff"
        loading={true}
        height={30}
        width={6}
        radius={4}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
      </div>
    )
  }
  {/* <Radio
  visible={true}
  height="120"
  width="175"
  color="#4fa94d"
  ariaLabel="radio-loading"
  wrapperClass="wrapper-class"
/>   */}
