const GBSY_IMAGES = Object.entries(
  import.meta.glob<string>('../assets/images/gbsy*', {
    eager: true,
    query: '?url',
    import: 'default',
  })
)
  .filter(([path]) => /\/gbsy\d+\.(jpe?g|png|webp)$/i.test(path))
  .sort((a, b) => {
    const numberA = Number(a[0].match(/gbsy(\d+)/i)?.[1] ?? 0);
    const numberB = Number(b[0].match(/gbsy(\d+)/i)?.[1] ?? 0);
    return numberA - numberB;
  });

const GBSY_PHOTOS: GalleryPhoto[] = GBSY_IMAGES.map(([path, src]) => {
  const number = Number(path.match(/gbsy(\d+)/i)?.[1] ?? 0);
  return {
    id: `gbsy-${number}`,
    src,
    alt: `박기범 · 정수연 웨딩 사진 ${number}`,
    caption: '박기범 · 정수연',
  };
});

export interface AccountInfo {
  side: 'groom' | 'bride';
  roleLabel: string;
  holder: string;
  bank: string;
  accountNumber: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface TransitGroup {
  label?: string;
  items: string[];
}

export interface TransitSection {
  title: string;
  groups: TransitGroup[];
  footerNote?: string[];
}

export const WEDDING_DATA = {
  groom: {
    fullName: '박기범',
    firstName: '기범',
    father: '박상호',
    mother: '우종분',
    order: '장남',
  },
  bride: {
    fullName: '정수연',
    firstName: '수연',
    father: '정성호',
    mother: '이순희',
    order: '장녀',
  },
  date: {
    iso: '2027-04-24T11:00:00+09:00',
    year: 2027,
    month: 4,
    day: 24,
    weekday: '토요일',
    timeLabel: '오전 11시',
    shortDate: '2027. 04. 24',
    displayFull: '2027년 4월 24일 토요일 오전 11시',
  },
  venue: {
    name: '밀리토피아호텔 웨딩센터',
    hall: '2층 아이리스홀',
    fullName: '밀리토피아호텔 웨딩센터 2층 아이리스홀',
    address: '경기도 성남시 수정구 위례대로 83',
    mapImage: `${import.meta.env.BASE_URL}assets/aistudio/____________-2_10852b9f.jpg`,
    naverMapUrl:
      'https://map.naver.com/p/search/' +
      encodeURIComponent('경기도 성남시 수정구 위례대로 83 밀리토피아호텔 웨딩센터'),
    kakaoMapUrl:
      'https://map.kakao.com/link/search/' +
      encodeURIComponent('밀리토피아호텔 웨딩센터'),
  },
  photos: GBSY_PHOTOS,
  greeting: [
    '선선한 가을바람 속에서 처음 마주 잡은 두 손이',
    '',
    '세 번의 겨울을 건너, 눈부신 봄날에 닿았습니다.',
    '',
    '삼 년 반이라는 시간 동안 서로의 계절이 되어준 저희 두 사람,',
    '',
    '이제 평생의 봄을 함께 가꾸려 합니다.',
    '',
    '소중한 날 걸음 하시어',
    '',
    '저희의 새로운 시작을 축복해 주시면 감사하겠습니다.',
  ],
  transitSections: [
    {
      title: '밀리토피아호텔 바이마린 셔틀버스 안내',
      groups: [
        {
          items: [
            '운행 구간: 남위례역 5번 출구 ↔ 호텔',
            '운행 요일: 주말(토·일), 예식 진행 시',
            '운행 시간: 예식 1시간 전부터 예식 후 2시간까지',
            '운행 간격: 약 15분',
          ],
        },
      ],
    },
    {
      title: '대중교통 이용 시',
      groups: [
        {
          label: '남위례역(8호선)',
          items: ['3·4번 출구 도보 약 8분'],
        },
        {
          label: '복정역(8호선·수인분당선)',
          items: [
            '1-1·2번 출구에서 도보 약 30분',
            '50번·343번·345번 버스 (위례래미안이편한세상·힐스테이트위례 하차 / 약 10분 소요)',
          ],
        },
        {
          label: '수서역(3호선·GTX-A)',
          items: [
            '331번 → 343번 버스 (문정법조단지·건영아파트 환승, 밀리토피아시티·위례역푸르지오 하차 / 약 40분 소요)',
            '361번 → 343번·345번 버스 (복정역환승센터 환승, 위례래미안이편한세상·힐스테이트위례 하차 / 약 40분 소요)',
          ],
        },
      ],
    },
    {
      title: '자가용 이용 시',
      groups: [
        {
          label: '주차 약 600대 가능',
          items: [
            '복정교차로 → 창곡교차로(위례동 방면) → 밀리토피아호텔',
            '산성역 사거리(서울 방면) → 창곡교차로(위례동 방면) → 밀리토피아호텔',
          ],
        },
      ],
    },
  ] as TransitSection[],
  accounts: [
    {
      side: 'groom',
      roleLabel: '신랑',
      holder: '박기범',
      bank: '국민은행',
      accountNumber: '94290200430824',
    },
    {
      side: 'groom',
      roleLabel: '신랑 아버지',
      holder: '박상호',
      bank: '신한은행',
      accountNumber: '50306834830',
    },
    {
      side: 'groom',
      roleLabel: '신랑 어머니',
      holder: '우종분',
      bank: '신한은행',
      accountNumber: '50306953154',
    },    
    {
      side: 'bride',
      roleLabel: '신부',
      holder: '정수연',
      bank: '카카오뱅크',
      accountNumber: '3333182135588',
    },
    {
      side: 'bride',
      roleLabel: '신부 아버지',
      holder: '정성호',
      bank: '농협',
      accountNumber: '3021154921311',
    },
    {
      side: 'bride',
      roleLabel: '신부 어머니',
      holder: '이순희',
      bank: '농협',
      accountNumber: '17202638750',
    },    
  ] as AccountInfo[],
};

export function downloadWeddingIcs(): void {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SeojinJieunWedding//MobileInvitation//KO',
    'BEGIN:VEVENT',
    'UID:kibeom-sooyeon-20270424@wedding.local',
    'DTSTAMP:20261125T000000Z',
    'DTSTART;TZID=Asia/Seoul:20270424T110000',
    'DTEND;TZID=Asia/Seoul:20270424T130000',
    'SUMMARY:박기범 · 정수연 결혼식',
    'LOCATION:경기도 성남시 수정구 위례대로 83 밀리토피아호텔 웨딩센터 2층 아이리스홀',
    'DESCRIPTION:2027년 4월 24일 토요일 오전 11시, 박기범과 정수연의 결혼식입니다.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = '박기범_정수연_결혼식.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
