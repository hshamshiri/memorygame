import react, { useState, useEffect } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";

const imgs = [
  { id: 0, gameId: 0, src: "./images/1.png", showing: true, lock: false },
  { id: 1, gameId: 1, src: "./images/2.png", showing: true, lock: false },
  { id: 2, gameId: 0, src: "./images/1.png", showing: true, lock: false },
  { id: 3, gameId: 1, src: "./images/2.png", showing: true, lock: false },
  { id: 4, gameId: 2, src: "./images/4.png", showing: true, lock: false },
  { id: 5, gameId: 3, src: "./images/3.png", showing: true, lock: false },
  { id: 6, gameId: 3, src: "./images/3.png", showing: true, lock: false },
  { id: 7, gameId: 2, src: "./images/4.png", showing: true, lock: false },
];
export default function App() {
  const [images, setImages] = useState(imgs);
  const [shownImage, setShownImage] = useState(null);

  useEffect(() => {
    reloadGame();
  }, []);

  const reloadGame = () => {
    shuffle();
    toggleShow("show");
    toggleShow("hide");
  };

  const shuffle = () => {
    setShownImage(null);
    const copyImages = images;
    for (var i = copyImages.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copyImages[i];
      copyImages[i] = copyImages[j];
      copyImages[j] = temp;
    }
  };

  const toggleShow = (type) => {
    const copyImages = images;

    if (type === "show") {
      for (let copyImage of [...copyImages]) {
        copyImage.showing = true;
      }
      setImages([...copyImages]);
    } else if (type === "hide") {
      setTimeout(() => {
        for (let copyImage of [...copyImages]) {
          copyImage.showing = false;
        }
        setImages([...copyImages]);
      }, 2000);
    }
  };
  const lockImage = () => {};

  const showImage = (e, image) => {
    if (!shownImage) {
      //first image is showing
      image.showing = true;
      setShownImage(image);
    } else {
      //second image is showing

      image.showing = true;
      if (shownImage.gameId === image.gameId) {
        setShownImage(null);
      } else {
        setTimeout(() => {
          let firstImage = images.find((item) => item.id === shownImage.id);
          let secondImage = images.find((item) => item.id === image.id);
          firstImage.showing = false;
          firstImage.lock = false;
          secondImage.showing = false;
          secondImage.lock = false;

          setShownImage(null);
        }, 400);
      }
    }

    setImages([...images]);
  };

  return (
    <div className="grid w-screen h-screen grid-cols-4 gap-3">
      {images.map((image, i) => {
        return (
          <Flippy
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="vertical"
            isFlipped={image.showing}
            //ref={ref}
            key={`img-${i}`}
          >
            <FrontSide>
              <button
                onClick={(e) => !image.showing && showImage(e, image)}
                className=" justify-center aligns-center w-full h-full font-bold "
              >
                <div>click me!</div>
              </button>
            </FrontSide>
            <BackSide>
              <img src={image.src} className=" w-full h-full object-contain" />
            </BackSide>
          </Flippy>
        );
      })}
      <div className="w-screen flex  justify-center aligns-center">
        <button
          className="w-40 h-10 shadow rounded mt-5 bg-green-500"
          onClick={() => reloadGame()}
        >
          shuffle
        </button>
      </div>
    </div>
  );
}
