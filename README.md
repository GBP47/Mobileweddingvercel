# 모바일 청첩장

React, TypeScript, Vite로 만든 정적 모바일 청첩장입니다. 예식 정보와 사진은 `src/data/weddingData.ts`에서 수정합니다.

## 로컬에서 확인

Node.js 20.19 이상 또는 22.12 이상이 필요합니다.

```sh
npm install
npm run dev
```

## 사진 바꾸기

사진 파일은 `src/assets/images/`에 있습니다. 대표 사진은 `hero_bw_couple_1795611964775.jpg`, 갤러리 사진은 `gallery_bw_walk_1795611964110.jpg`, `gallery_bw_hands_1795611964457.jpg`, `gallery_bw_rings_1795611964872.jpg`입니다. 새 사진을 같은 파일명으로 덮어쓰면 코드 수정 없이 교체할 수 있습니다. 세로형 고해상도 사진을 권장하며, JPG/WebP로 저장하고 한 장당 1MB 안팎으로 줄이면 모바일에서 더 빨리 열립니다. 캡션과 대체 텍스트를 바꾸려면 `src/data/weddingData.ts`의 `photos` 항목도 수정하세요.

교체 후 `npm run dev`로 화면을 확인하고 변경 파일을 다시 GitHub에 push하면 Vercel이 자동으로 새 버전을 게시합니다.

## Vercel 배포

이 프로젝트 폴더를 GitHub 저장소에 push한 뒤 [Vercel](https://vercel.com/)에서 **Add New → Project**로 저장소를 가져오세요. Vercel은 `vercel.json`을 기준으로 빌드합니다. Framework는 Vite, Build Command는 `npm run build`, Output Directory는 `dist`입니다. 연결을 완료하면 `main`에 push할 때마다 자동 배포됩니다. 공개 주소는 Vercel 프로젝트의 **Domains**에서 확인할 수 있습니다. Kakao Developers 웹 플랫폼 도메인에도 그 주소를 등록해야 카카오톡 공유 SDK가 작동합니다.

## GitHub Pages 배포

저장소를 `mobile-wedding` 이름으로 GitHub에 올리고 `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 빌드와 배포를 진행합니다. GitHub 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정하세요. 배포가 끝나면 주소는 보통 `https://<GitHub 사용자명>.github.io/mobile-wedding/`입니다.

저장소 이름을 다르게 쓰면 `.github/workflows/deploy.yml`의 `VITE_BASE_PATH`를 `/<저장소명>/`으로 바꿔야 합니다. 사용자 페이지 저장소(`<사용자명>.github.io`)나 별도 도메인을 쓸 때는 기본 경로에 맞게 `VITE_BASE_PATH`를 `/`로 변경하세요.

## 공개 전에 확인

- `src/data/weddingData.ts`의 이름, 가족 관계, 날짜, 장소, 교통 안내, 계좌 정보를 실제 초대할 내용으로 확인합니다. 계좌 정보는 공개 페이지에서 누구나 볼 수 있습니다.
- 실제 사진 사용 동의 및 이미지 대체 텍스트를 확인합니다.
- 카카오톡 공유 SDK를 쓰려면 Kakao Developers에서 웹 도메인을 등록하고 Actions에 `VITE_KAKAO_JS_KEY` 저장소 변수를 설정해야 합니다. 키가 없어도 기기 공유 또는 링크 복사 기능은 동작합니다.
- `firebase-applet-config.json`은 브라우저용 Firebase 설정입니다. Firestore를 연결하는 경우 배포 전 보안 규칙을 별도로 검토하고 적용하세요.

현재 GitHub 원격 저장소 정보는 프로젝트에 포함되어 있지 않아, 원격 저장소 생성과 첫 push는 GitHub 계정에서 연결 후 진행해야 합니다.
