# Character Introduction V3

## 구성

1. INTRO — ENTER를 누르면 소리와 함께 영상 재생
2. PROLOGUE — 문구가 느리게 한 줄씩 중앙에 등장
3. LANDING — `assets/landing.jpg`
4. TERMS — 약관 + 네/아니요

## 교체 파일

- `assets/intro.mp4` : 인트로 영상
- `assets/intro-poster.jpg` : INTRO로 다시 올라왔을 때 표시할 정지 이미지
- `assets/landing.jpg` : 랜딩페이지 JPG

파일명을 유지하면 코드를 수정할 필요가 없습니다.

## 동의

네 → `welcome.html`

아니요 → `404.html`

## GitHub Pages

저장소 최상위에 파일을 업로드한 후
Settings → Pages → Deploy from a branch → main → /(root)
로 배포합니다.
