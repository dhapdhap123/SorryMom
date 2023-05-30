// 오늘 날짜 가져오는 함수
function dateControl() {
  const yearContainer = document.querySelector(".year");
  const monthContainer = document.querySelector(".month");
  const dayContainer = document.querySelector(".day");
  const weekdayContainer = document.querySelector(".weekday");

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][today.getDay()];

  yearContainer.innerText = year;
  monthContainer.innerText = month;
  dayContainer.innerText = day;
  weekdayContainer.innerText = weekday;
}

// 송출화면과 user_input 상호작용
const titleDiv = document.querySelector(".title_div");
const contentDiv = document.querySelector(".content_div");

const title = document.querySelector(".title");
const content = document.querySelector(".content");

title.addEventListener("input", (e) => {
  titleDiv.innerHTML = "제목: " + e.target.value;
});
const displayInput = () => {
  const inputText = document.getElementById("myInput");
  const displayArea = document.getElementById("displayArea");
  displayArea.innerText = inputText.value;
  initManuscript();
};

// 원고지 함수
const initManuscript = () => {
  const manuscript = document.querySelectorAll(".manuscript");
  const handleResize = () => {
    manuscript.forEach((elt) => {
      //   resizeMnuascriptContainer(elt);
      resizeImage(elt);
    });
  };

  window.addEventListener("load", handleResize, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  manuscript.forEach((element) => {
    element.querySelectorAll("#displayArea").forEach((element) => {
      const text = element.innerText;

      element.innerHTML = "";
      let lineCount = 0;
      let charCount = 0;

      [...text].forEach((word) => {
        if (charCount >= 60 || lineCount >= 5) {
          return;
        }

        const span = document.createElement("span");
        const textNode = document.createTextNode(word);
        if (word === " ") {
          span.setAttribute("class", "blank");
        }
        span.appendChild(textNode);
        element.append(span);

        charCount++;

        if (charCount % 12 === 0) {
          element.appendChild(document.createElement("br"));
          lineCount++;
        }
      });
    });
  });

  handleResize();
};

const resizeImage = (element) => {
  element.querySelectorAll("img").forEach((img) => {
    const { naturalWidth, naturalHeight } = img;
    const ratio = naturalHeight / naturalWidth;
    const newHeight = element.offsetWidth * ratio;

    img.height = Math.floor(newHeight - (newHeight % 32) - 8);
  });
};

// 그림일기 사진 src 변경 함수
const previewImage = (event) => {
  const input = event.target;
  const preview = document.getElementById("image-preview");

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    preview.src = "#";
    preview.style.display = "none";
  }
};

// 이미지 다운로드
const downloadImage = async () => {
  const container = document.getElementById("diary-container");
  const canvas = await html2canvas(container);
  const image = canvas.toDataURL();

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // Internet Explorer 또는 Microsoft Edge에서 실행되는 경우
    const byteCharacters = atob(image.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });
    window.navigator.msSaveOrOpenBlob(blob, "diary_screenshot.png");
  } else {
    // 모바일 브라우저 또는 일반 데스크탑 브라우저에서 실행되는 경우
    const link = document.createElement("a");
    link.href = image;
    link.download = "diary_screenshot.png";
    link.target = "_blank";

    if (navigator.userAgent.match(/CriOS/i)) {
      // 크롬 브라우저에서 실행되는 경우
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
    } else {
      // 다른 브라우저에서 실행되는 경우
      link.click();
    }
  }
};

// axios.post 요청 함수(로그인 시)
const uploadImage = async () => {
  alert("로그인, 업로드 기능은 구현예정입니다.");
  // try {
  //   const container = document.getElementById("our_example");
  //   const canvas = await html2canvas(container); // html2canvas 함수를 await로 호출하여 canvas를 얻음
  //   image = canvas.toDataURL(); // 스크린샷 이미지 데이터를 image 변수에 할당

  //   const startIndex = image.indexOf(",") + 1;
  //   const trimmedString = image.substring(startIndex);

  //   const res = await axios.post("/create_fake/", {
  //     title: titleInput.value == undefined ? "" : titleInput.value,
  //     content: contentInput.value == undefined ? "" : contentInput.value,
  //     sign: signInput.value == undefined ? "" : signInput.value,
  //     img: trimmedString,
  //   });
  //   console.log(res);
  // } catch (e) {
  //   console.log(e);
  // }
};

// render시 함수 실행
dateControl();
initManuscript();
