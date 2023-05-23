// 송출화면과 user_input 상호작용
const titleDiv = document.querySelector(".title_div");
const contentDiv = document.querySelector(".content_div");
const signDiv = document.querySelector(".sign_div");

const titleInput = document.querySelector(".title");
const contentInput = document.querySelector(".content");
const signInput = document.querySelector(".sign");

titleInput.addEventListener("input", (e) => {
  titleDiv.innerHTML = e.target.value;
});

contentInput.addEventListener("input", (e) => {
  contentDiv.innerHTML = e.target.value;
});

signInput.addEventListener("input", (e) => {
  signDiv.innerHTML = e.target.value;
});

// 배경마크와 직인 src 변경 함수
const previewImage = (event) => {
  const input = event.target;
  const preview = document.getElementById("image-preview");

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
      closeModal();
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    preview.src = "#";
    preview.style.display = "none";
  }
};
const previewImage_2 = (event) => {
  const input = event.target;
  const previews = document.querySelectorAll(".image-preview_2");

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const src = e.target.result;
      previews.forEach((preview) => {
        preview.src = src;
        preview.style.display = "block";
      });
    };

    reader.readAsDataURL(input.files[0]);
    closeModal_2();
  } else {
    previews.forEach((preview) => {
      preview.src = "";
      preview.style.display = "none";
    });
  }
};
// 모달_1은 배경마크고르기 모달, 모달_2는 직인 고르기 모달
const modal_1 = document.getElementById("modal_1");
const openBtn = document.querySelector(".open-button");
function openModal(e) {
  modal_1.classList.remove("hidden");
}
openBtn.addEventListener("click", openModal);
const closeBtn = modal_1.querySelector(".close");
const overlay = modal_1.querySelector(".modal-overlay");
function closeModal() {
  modal_1.classList.add("hidden");
}
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

const modal_2 = document.getElementById("modal_2");
const openBtn_2 = document.getElementById("open-button_2");
function openModal_2(e) {
  modal_2.classList.remove("hidden");
}
openBtn_2.addEventListener("click", openModal_2);
const closeBtn_2 = modal_2.querySelector(".close");
const overlay_2 = modal_2.querySelector(".modal-overlay");
function closeModal_2() {
  modal_2.classList.add("hidden");
}
closeBtn_2.addEventListener("click", closeModal_2);
overlay_2.addEventListener("click", closeModal_2);

// 마크 예시(고대, 연대, nct마크) 적용 함수
const onMarkChange = (e) => {
  const preview = document.getElementById("image-preview");
  const img = e.target.src;
  const startIndex = img.indexOf(",") + 1;
  const trimmedString = img.substring(startIndex);
  preview.src = `data:image/png;base64,${trimmedString}`;
  closeModal();
};
// 직인 예시(고대, 연대, 보스) 적용 함수
const onStampChange = (e) => {
  const previews = document.querySelectorAll(".image-preview_2");
  const img = e.target.src;
  const startIndex = img.indexOf(",") + 1;
  const trimmedString = img.substring(startIndex);

  previews.forEach((preview) => {
    preview.src = `data:image/png;base64,${trimmedString}`;
  });
  closeModal_2();
};

// 이미지 다운로드
const downloadImage = async () => {
  const container = document.getElementById("our_example");

  let image; // image 변수를 함수 스코프에 선언
  const canvas = await html2canvas(container); // html2canvas 함수를 await로 호출하여 canvas를 얻음
  image = canvas.toDataURL(); // 스크린샷 이미지 데이터를 image 변수에 할당

  const link = document.createElement("a");
  link.href = image;
  link.download = "fake_screenshot.png";
  link.click();
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
