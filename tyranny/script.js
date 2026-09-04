const pages = document.getElementById("pages");

const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const enterButton = document.getElementById("enterButton");
const introStatus = document.getElementById("introStatus");

const prologueLines = document.querySelectorAll(".prologue__line");

const submitButton = document.getElementById("submitAgreement");
const agreementMessage = document.getElementById("agreementMessage");

/* ENTER를 누른 순간 소리와 함께 영상 시작 */
enterButton.addEventListener("click", async () => {
  enterButton.classList.add("is-hidden");
  introStatus.classList.add("is-hidden");

  try {
    video.currentTime = 0;
    await video.play();
  } catch (error) {
    enterButton.classList.remove("is-hidden");
    introStatus.classList.remove("is-hidden");
    introStatus.textContent = "CLICK TO PLAY";
  }
});

/* 영상 종료 → 두 번째 페이지(prologue)로 이동 */
video.addEventListener("ended", () => {
  intro.classList.add("is-finished");

  const prologue = document.getElementById("prologue");
  if (prologue) {
    prologue.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});

/* INTRO 포스터 표시 */
function showIntroPoster() {
  if (!intro.classList.contains("is-finished")) return;
  video.pause();
  intro.classList.add("is-finished");
}

/* 섹션 감지 및 자동 스크롤 연출 */
const pageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      if (entry.target.id === "intro") {
        showIntroPoster();
      }

      if (entry.target.id === "prologue") {
        const interval = 850; // 텍스트 라인 간격 (ms)
        const readingDelay = 2000; // 마지막 라인 표시 후 대기 시간 (ms)

        // 1. 프롤로그 라인 순차 표시
        prologueLines.forEach((line, index) => {
          window.setTimeout(() => {
            line.classList.add("is-visible");
          }, index * interval);
        });

        // 2. 연출 완료 후 세 번째 섹션(#landing)으로 이동
        const totalDuration = (prologueLines.length - 1) * interval + readingDelay;

        window.setTimeout(() => {
          // [수정] 네 번째('agreement')가 아닌 세 번째 랜딩 섹션('landing') ID 지정
          const nextSection = document.getElementById("landing"); 

          if (nextSection) {
            pageObserver.unobserve(entry.target);

            nextSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }, totalDuration);
      }
    });
  },
  {
    root: pages,
    threshold: 0.1
  }
);

document.querySelectorAll(".page").forEach((page) => {
  pageObserver.observe(page);
});

/* 동의 버튼 클릭 이벤트 */
if (submitButton) {
  submitButton.addEventListener("click", () => {
    const selected = document.querySelector(
      'input[name="agreement"]:checked'
    );

    if (!selected) {
      if (agreementMessage) agreementMessage.textContent = "선택해 주세요.";
      return;
    }

    if (agreementMessage) agreementMessage.textContent = "";

    if (selected.value === "yes") {
      window.location.href = "welcome.html";
    } else {
      window.location.href = "404.html";
    }
  });
}