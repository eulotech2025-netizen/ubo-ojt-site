// 용어 · 부품 데이터 한 벌 — 용어 칸(terms.html · term.html)과 부품 칸(parts.html · part.html)이 같이 읽는다.
//   GROUPS  가구 한 짝의 자리 ①~⑩ — 부품 칸의 줄
//   PARTS   쇼핑몰 분류 — 이름은 실무자가 쓰는 말 그대로 둔다
//           tag 'b' = 브랜드 이름이 분류 이름 · 'i' = 수입 묶음
//           guess = 쉬운 말이 (추정) — 상품 설명을 아직 확인하지 않은 것
//           moves = 움직이는 부품 → 3D 로 보여 줄 것, 아니면 사진
//           items = 「안에 든 것」. 문자열 하나가 한 칸, 따로 쪽이 있는 것만 { id, name, en, note(고급 · 기본 같은 덧말), model, openSeconds, modelNote(모형 안내) }
//           sets  = 안에 든 것이 둘로 나뉠 때 [이름, [칸 …]]
//   WORDS   쉬운 말 안에 풀이된 낱말 — 용어 칸의 한 장. from = 풀이가 나온 부품
//   ALIASES 같은 것, 다른 말 → 넘겨주기 (위키의 넘겨주기와 같다)
//   BLUM    블럼 홈페이지 묶음 ↔ 우리 쇼핑몰 묶음
// 한글 이름은 회사가 맞다고 확인했다 (10-29). (추정) 은 글 안에 그대로 두지 않고 guess 로 적는다.
(function (root) {
  'use strict';

  var GROUPS = [
    { no: 1, name: '문짝 · 판', title: '가구의 얼굴과 뼈대', note: '색 · 결 · 두께를 고르는 자리. 브랜드 시리즈 이름이 많다' },
    { no: 2, name: '경첩 · 리프트 · 미닫이', title: '문을 여닫는 쇠붙이', note: '문짝을 몸통에 붙이고, 부드럽게 열리고 닫히게' },
    { no: 3, name: '서랍 · 레일', title: '서랍이 미끄러지게', note: '레일(미끄럼틀)과 서랍 통. 언더레일은 밑에 숨고, 볼레일은 옆에 보인다' },
    { no: 4, name: '손잡이', title: '문과 서랍을 잡는 것', note: '구멍 수(1홀 · 2홀)와 모양(바 · 매립)으로 고른다. 2홀은 구멍 간격을 재야 한다' },
    { no: 5, name: '안쪽 수납 · 선반', title: '문 안에 들어가는 것', note: '바구니 · 선반 · 걸이 · 드레스룸 뼈대. 어느 장(상부 · 하부 · 키큰장 · 코너)에 넣나로 나뉜다' },
    { no: 6, name: '발 · 걸레받이 · 철제', title: '바닥에서 띄우고 수평 맞추기', note: '가구발은 안 보이는 받침, 다리발은 보이는 다리, 레벨라는 높이 조절 나사' },
    { no: 7, name: '잠금 · 락카 · 사무가구', title: '잠그는 것', note: '열쇠 종류로 나뉜다. 락카(사물함) 꾸밈 자재와 사무 가구 부속도 여기' },
    { no: 8, name: '피스 · 전기', title: '짜 맞추는 작은 쇠붙이와 전기', note: '나사 · 체결구와 가구에 다는 콘센트 · 조명' },
    { no: 9, name: '주방 가전', title: '주방에 끼워 넣는 기계', note: '가구가 아니라 가전. 빌트인 = 가구에 끼움, 프리스탠딩 = 올려 놓음' },
    { no: 10, name: '싱크 · 수전 · 욕실', title: '물이 닿는 자리', note: '개수대 통(볼) · 수도꼭지(수전) · 배수구, 그리고 욕실' }
  ];

  var PARTS = [
    // ① 문짝 · 판
    { id: 'woodgrain', g: 1, name: '우드그레인', easy: '나무결 무늬 문짝 · 판', guess: true, items: ['색상 · 규격별'] },
    { id: 'slimline-tu', g: 1, name: '슬림라인 TU', easy: '테두리가 얇은 알루미늄 틀 문짝', guess: true, items: [] },
    { id: 'multilayer', g: 1, name: '멀티레이어 시리즈', easy: '여러 겹을 붙여 만든 판 · 문짝', guess: true, items: [] },
    { id: 'haman-lucid', g: 1, name: '하만 · 루시드(LUCID)', brand: '하만', tag: 'b', easy: '하만의 루시드 문짝 묶음, 구성품은 따로', guess: true, items: ['하만 루시드(HM LUCID)', '하만 루시드 구성품(HM LUCID 구성품)'] },
    { id: 'haman-nuomi', g: 1, name: '하만 · 누오미(NUOMI)', brand: '하만', tag: 'b', easy: '하만의 누오미 문짝 시리즈. 주방용과 붙박이용이 다르다', guess: true,
      sets: [['주방', ['엔칸토', '알파', '팬텀', '퍼플', '데바라자', '카로']], ['붙박이', ['헤라', '제이드', '바이올렛', '마타']], ['', ['기타']]] },
    { id: 'panel-colors', g: 1, name: '판넬&색상표', easy: '색을 고를 때 보는 견본', items: ['알루미늄 도어', '스티커', '대리석', '손잡이 색상표', '기타'] },
    { id: 'plywood', g: 1, name: '합판', easy: '가구 몸통을 짜는 판재', items: [] },

    // ② 경첩 · 리프트 · 미닫이
    { id: 'hinge', g: 2, name: '경첩', easy: '여닫이문의 관절. 댐퍼 = 소리 없이 살살 닫힘', moves: true, items: ['탈착용 댐퍼', '사이드 댐퍼',
        { id: 'in-out', name: '인도어, 아웃도어', model: '3d/hinge-in-out.glb?v=1', openSeconds: 1, target: '0m 0.2m -0.1m', radius: '1.5m', guess: true,
          easy: '아웃도어는 문이 몸통 옆판까지 덮고, 인도어는 문이 몸통 안에 쏙 들어간다',
          modelNote: '왼쪽 장이 아웃도어, 오른쪽 장이 인도어다. 경첩은 실물보다 크게, 마디 움직임은 줄여 그렸다. 움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' },
        '유리경첩', '경첩 마운틴(받침판)', '기타'] },
    { id: 'blum-hinge', g: 2, name: '블럼 › 경첩', brand: '블럼', tag: 'b', easy: '블럼(오스트리아) 경첩. 살살 닫힘이 들어 있는 것이 블루모션(BLUMOTION)', moves: true,
      items: [
        { id: 'clip-top-blumotion', name: '클립 탑 블루모션', en: 'CLIP top BLUMOTION' },
        { id: 'clip-top', name: '클립 탑', en: 'CLIP top' },
        { id: 'modul', name: '모듈', en: 'MODUL' },
        '105°'
      ] },
    { id: 'blum-lift', g: 2, name: '블럼 › 리프트 시스템', brand: '블럼', tag: 'b', easy: '위로 여는 문(상부장 플랩) 장치. 아벤토스(AVENTOS) 식구', moves: true,
      items: [
        { id: 'hf', name: 'F자로 접힘', en: 'HF', model: '3d/hf.glb?v=2', confirmed: '10-29',
          easy: '윗문은 위로 들리고, 아랫문은 세로로 선 채 윗문 끝에 매달려 따라 올라간다',
          openSeconds: 1, modelNote: '단순하게 만든 모형이라 실제 제품의 치수 · 장치 모양과 다르다 (장 너비 90cm · 높이 80cm 기준)' },
        { id: 'hs', name: '위로 올림', en: 'HS', model: '3d/hs.glb?v=1', openSeconds: 1, target: '0m 0.48m -0.15m', radius: '2m', guess: true,
          easy: '문이 바깥으로 젖혀지며 올라가 장 위로 넘어간다', modelNote: '문이 지나는 길은 짐작으로 그렸다. 움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' },
        { id: 'hl', name: '평행', en: 'HL', model: '3d/hl.glb?v=1', openSeconds: 1, target: '0m 0.48m -0.15m', radius: '2m', guess: true,
          easy: '문이 세로로 선 채 위로 올라가 장 위에 선다', modelNote: '문이 지나는 길은 짐작으로 그렸다. 움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' },
        { id: 'hk', name: '고정', en: 'HK', model: '3d/hk.glb?v=1', openSeconds: 1, target: '0m 0.35m 0m', radius: '1.8m', guess: true,
          easy: '문 윗변을 축으로 위로 들려 열린다. 어느 각도에서나 멈춘다', modelNote: '움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' },
        { id: 'hk-s', name: '작은 고정', en: 'HK-S', model: '3d/hk.glb?v=1', openSeconds: 1, target: '0m 0.35m 0m', radius: '1.8m', guess: true,
          modelNote: '고정(HK)의 모형으로 보여 준다 — 더 작은 문에 쓰는 것으로 보이고, 장치 크기는 다르다. 움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' },
        { id: 'hk-xs', name: '더 작은 고정', en: 'HK-XS', model: '3d/hk.glb?v=1', openSeconds: 1, target: '0m 0.35m 0m', radius: '1.8m', guess: true,
          modelNote: '고정(HK)의 모형으로 보여 준다 — 더 작은 문에 쓰는 것으로 보이고, 장치 크기는 다르다. 움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' },
        { id: 'hki', name: '일체형', en: 'HKi', model: '3d/hk.glb?v=1', openSeconds: 1, target: '0m 0.35m 0m', radius: '1.8m', guess: true,
          modelNote: '고정(HK)의 모형으로 보여 준다 — 일체형은 장치가 옆판 안에 들어가 겉에 안 보이는 것으로 보인다. 움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' }
      ] },
    { id: 'flap-stay', g: 2, name: '플랩스테이/쇼바', easy: '위로 여는 문을 받쳐 주는 가스 쇼바 · 플랩스테이 (블럼 리프트의 보통판)', moves: true, items: ['플랩스테이/쇼바'] },
    { id: 'sliding', g: 2, name: '슬라이딩&미닫이', easy: '옆으로 미는 문 부속', moves: true, items: ['슬라이딩 도어 부속', '헤티히 (독일)'] },

    // ③ 서랍 · 레일
    { id: 'drawer-hw', g: 3, name: '서랍재', easy: '레일 모음. 뎀퍼 = 살살 닫힘, 푸쉬 = 눌러서 열림', moves: true,
      items: [
        { id: 'under-rail', name: '언더레일', model: '3d/under-rail.glb?v=1', openSeconds: 1, target: '0m 0.13m -0.03m', radius: '1.6m', guess: true,
          easy: '서랍 밑에 숨는 레일. 닫으면 안 보이고, 닫힐 때 끝에서 살살 닫힌다',
          modelNote: '오른쪽 옆판 · 윗판은 비치게 그렸다 — 「옆에서」 로 서랍 밑 레일을 본다. 끝에서 살살 닫히는 것(댐퍼)은 짐작이다. 움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' },
        { id: 'ball-rail', name: '3단 볼레일', model: '3d/ball-rail.glb?v=1', openSeconds: 1, target: '0m 0.13m -0.03m', radius: '1.6m', guess: true,
          easy: '서랍 옆에 붙는 레일. 세 겹이 차례로 빠지며 서랍이 끝까지 나온다',
          modelNote: '오른쪽 옆판 · 윗판은 비치게 그렸다 — 「옆에서」 로 레일 세 겹을 본다. 레일은 실물보다 높게 그렸다. 움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' },
        '레일 뎀퍼', '3단 볼레일 뎀퍼', '3단 볼레일 푸쉬', '롤러 레일(기본)', '텐덤 서랍', 'SDS 서랍', '쿠커언더레일', '포켓&교탁레일', '기타'] },
    { id: 'blum-box', g: 3, name: '블럼 › 서랍 시스템', brand: '블럼', tag: 'b', easy: '금속 서랍 통. 옆판까지 한 벌', moves: true,
      items: [
        { id: 'legrabox', name: '레그라박스', en: 'LEGRABOX', note: '고급' },
        { id: 'tandembox', name: '텐덤박스', en: 'TANDEMBOX', note: '기본' },
        { id: 'metabox', name: '메타박스', en: 'METABOX', note: '단순' }
      ] },
    { id: 'blum-runner', g: 3, name: '블럼 › 언더레일', brand: '블럼', tag: 'b', easy: '나무 서랍 밑에 다는 레일', moves: true,
      items: [{ id: 'movento', name: '모벤토', en: 'MOVENTO' }, { id: 'tandem', name: '텐덤', en: 'TANDEM' }] },
    { id: 'blum-push', g: 3, name: '블럼 › 푸쉬 언더레일', brand: '블럼', tag: 'b', easy: '손잡이 없이 눌러서 여는 언더레일', moves: true,
      items: [{ id: 'tip-on', name: '팁온', en: 'TIP-ON' }] },
    { id: 'bona-box', g: 3, name: '보나박스(BONA BOX)', easy: '서랍 통 묶음', guess: true, moves: true, items: [] },
    { id: 'haman-hydrawer', g: 3, name: '하만(HM) 하이드로워', brand: '하만', tag: 'b', easy: '하만의 서랍 시스템', guess: true, moves: true, items: ['하이드로워', '하이드로워 악세사리'] },

    // ④ 손잡이
    { id: 'handle', g: 4, name: '가구 손잡이', easy: '1홀 = 나사 하나, 2홀 = 나사 둘, 매립형 = 파묻힘, 바형 = 긴 막대',
      items: ['1홀형', '1홀 도기', '1홀 콤비', '2홀형', '세트손잡이', '규격&주문제작', '매립형', '바형', '캐릭터', '시리즈형', '시즌 베스트', '기타'] },
    { id: 'special-bar', g: 4, name: '스페셜 바(BAR) — 포그 그레이, 크림 화이트', easy: '색을 맞춘 긴 바 손잡이', guess: true, items: [] },
    { id: 'lucid-tbar', g: 4, name: '루시드 T바', brand: '하만', tag: 'b', easy: '루시드 문짝에 맞는 T자 바 손잡이', guess: true, items: [] },
    { id: 'import-handle', g: 4, name: '수입 하드웨어 › 손잡이', brand: '수입', tag: 'i', easy: '수입 손잡이 셋', items: ['매립 손잡이', '1, 2홀 손잡이', '장바 및 주문 손잡이'] },

    // ⑤ 안쪽 수납 · 선반
    { id: 'kitchen-acc', g: 5, name: '주방 악세사리', easy: '주방장 안팎에 다는 수납 부속. 인출식 = 당겨 빼는 것',
      items: ['상부용', '중간 부착용 식기건조대', '중간 부착용', '상판용', '인출식망장', '인사이드', '칼꽂이', '다용도 분리함', '코너용', '키큰장용', '식탁&인출식 부속', '하이라인&홈바', '보조주방', '기타'] },
    { id: 'total-shelf', g: 5, name: '토탈(Total) 보조선반', easy: '상판 위에 세우는 보조 선반', items: ['기둥식 선반', '클립형', '식기건조대', '기타'] },
    { id: 'shelf', g: 5, name: '선반', easy: '벽이나 가구에 다는 선반', items: ['벽 선반', '기타 선반'] },
    { id: 'built-in-shoe', g: 5, name: '붙박이&신발장', easy: '붙박이장 · 신발장 안에 넣는 부속', items: ['붙박이용', '신발장용'] },
    { id: 'dress', g: 5, name: '드레스 시스템', easy: '드레스룸 뼈대. 어디에 붙이나로 나뉜다', items: ['천정형', '벽붙이형', '매립형', '세탁 / 재활용 보관함', '슬라이딩 도어', '악세사리 / 구성품'] },
    { id: 'import-storage', g: 5, name: '수입 하드웨어 › 수납', brand: '수입', tag: 'i', easy: '수입 수납 부속 셋', items: ['주방 하드웨어', '붙박이 하드웨어', '신발장 하드웨어'] },

    // ⑥ 발 · 걸레받이 · 철제
    { id: 'legs', g: 6, name: '다리발/가구발/캐스터/레벨라', easy: '다리 · 받침 · 바퀴 · 높이 조절', items: ['다리발', '가구발', '캐스터(바퀴)', '레벨라'] },
    { id: 'sink-legs', g: 6, name: '싱크다리발&걸레받이부속', easy: '싱크대 발과 걸레받이(발 가리개) 부속', items: ['싱크다리발&걸레받이 부속'] },
    { id: 'custom-steel', g: 6, name: '맞춤 철제', easy: '치수대로 만드는 철제', items: ['진열', '테이블'] },

    // ⑦ 잠금 · 락카 · 사무가구
    { id: 'lock', g: 7, name: '목재 및 유리 잠금장치', easy: '가구 · 유리문 자물쇠. 무엇으로 여나로 나뉜다', items: ['디지털키', '번호키', '다이얼키', '락카키', '슬라이딩키', '책상키', '유리 잠금장치', '기타'] },
    { id: 'locker', g: 7, name: '락카용 자재', easy: '사물함에 붙이는 번호 · 이름표', items: ['스티커', '밴드', '명찰꽂이', '번호고리', '기타'] },
    { id: 'oa', g: 7, name: '사무용(OA) 하드웨어', easy: '사무 가구 부속', items: ['사물함 경첩', '회전판', '기타'] },

    // ⑧ 피스 · 전기
    { id: 'fasteners', g: 8, name: '피스류', easy: '다보 = 선반 받침 핀, 미니픽스 · 라픽스 = 판끼리 잇는 체결구', items: ['다보', '피스', '피스캡', '꺽쇠', '라픽스', '미니픽스', '케이싱'] },
    { id: 'misc-hw', g: 8, name: '기타하드웨어', easy: '자리가 없는 작은 철물. 빠찌링 = 걸쇠', items: ['환풍구', '빠찌링', '스토퍼', '펜꽂이', '업&다운 테이블', '기타'] },
    { id: 'outlet', g: 8, name: '콘센트', easy: '가구에 다는 콘센트', items: ['매립형', '돌출형', '전선캡'] },
    { id: 'lighting', g: 8, name: '조명', easy: '상부장 밑 · 장 속 조명', items: ['중간 부착 조명', '할로겐'] },
    { id: 'haman-beta', g: 8, name: '하만(HM) 베타라이팅', brand: '하만', tag: 'b', easy: '하만의 LED 조명 묶음', guess: true, items: ['베타라이팅', '베타라이팅 부속품'] },

    // ⑨ 주방 가전
    { id: 'hood', g: 9, name: '렌지후드', easy: '연기를 빨아들이는 것. 어디에 다나로 나뉜다', items: ['아일랜드(천장)', '데코(벽 노출)', '디럭스', '빌트인(상부장 속)', '기타'] },
    { id: 'cooktop', g: 9, name: '가스쿡탑&전기쿡탑', easy: '불판. 하이라이트 = 전기 열선, 인덕션 = 자기장, 하이브리드 = 둘 다',
      sets: [['빌트인', ['가스', '법랑', '가스그릴', '하이라이트', '인덕션', '하이브리드']], ['프리스탠딩', ['하이라이트', '인덕션', '하이브리드']]] },
    { id: 'builtin-app', g: 9, name: '빌트인 가전', easy: '가구에 끼우는 가전 전부', items: ['가스오븐', '스팀오븐', '하부냉장고', '식기세척기', '식기건조기', '음식물처리기&탈수기', '행주도마 살균기', '쌀통', '정수기&절수페달', 'TV폰&라디오', '기타'] },
    { id: 'lg', g: 9, name: 'LG 빌트인 가전', brand: 'LG', tag: 'b', easy: 'LG 것만 따로 모음', items: ['가스쿡탑', '하이라이트', '하이브리드', '광파오븐', '가스오븐', '냉장고', '식기세척기', '드럼세탁기', '의류건조기', '기타'] },
    { id: 'import-app', g: 9, name: '수입가전', brand: '수입', tag: 'i', easy: '브랜드별 수입 가전 (후드가 많다)', items: ['엘리카', '팔맥', '일렉트로룩스', '기타'] },

    // ⑩ 싱크 · 수전 · 욕실
    { id: 'sink-bowl', g: 10, name: '싱크볼&수입싱크볼', easy: '개수대 통. 언더 = 상판 밑에 붙임, 리폼 = 바꿔 끼움',
      items: ['언더사각볼', '언더볼', '리폼볼', '법랑볼', '고니볼', '레이온볼', '마블 싱크볼', '수입 싱크볼', '미러, 엠보, 헤어라인 상판', '싱크볼 액세서리'] },
    { id: 'drain', g: 10, name: '싱크볼 배수구 부속', easy: '물 빠지는 구멍 부속. 오버 플로우 = 넘침 방지', items: ['소형 배수구', '대형 배수구', '오버 플로우', '기타'] },
    { id: 'faucet', g: 10, name: '싱크 수전', easy: '수도꼭지. 입수전 = 상판에 세움, 벽수전 = 벽에서 나옴', items: ['싱크 입수전', '싱크 벽수전', '수입 수전', '슈티에', '기타'] },
    { id: 'bath', g: 10, name: '욕실 가전 및 하드웨어', easy: '욕실 쪽 전부', items: ['욕실 수전', '비데', '욕실가전', '욕실장', '하드웨어', '기타'] },
    { id: 'bath-bowl', g: 10, name: '욕실볼', easy: '세면대 통', items: ['도기볼 언더', '스텐 원형볼', '세라믹 탑볼', '유리 탑볼'] }
  ];

  // 쉬운 말 안에 풀이된 낱말. easy 는 부록의 풀이를 그대로 옮겼다 — 새로 지은 풀이는 guess
  var WORDS = [
    { id: 'damper', name: '댐퍼', easy: '문이나 서랍이 소리 없이 살살 닫히게 하는 장치', from: ['hinge', 'drawer-hw'], see: ['blumotion'] },
    { id: 'blumotion', name: '블루모션', en: 'BLUMOTION', easy: '블럼의 살살 닫힘 장치. 블럼 경첩 · 서랍 안에 들어 있다', from: ['blum-hinge'], see: ['damper', 'tip-on-word', 'servo-drive'] },
    { id: 'tip-on-word', name: '팁온', en: 'TIP-ON', easy: '블럼의 눌러서 여는 장치. 손잡이 없이 연다. 우리 쇼핑몰에서는 푸쉬 언더레일 묶음', from: ['blum-push'], part: ['blum-push', 'tip-on'], see: ['push', 'blumotion'] },
    { id: 'servo-drive', name: '서보 드라이브', en: 'SERVO-DRIVE', easy: '블럼의 전동 열림 장치. 쇼핑몰에 따로 묶음은 없고 경첩 · 서랍 안에 들어 있다', see: ['blumotion', 'tip-on-word'] },
    { id: 'push', name: '푸쉬', easy: '눌러서 열림. 서랍재의 3단 볼레일 푸쉬가 이것', from: ['drawer-hw'], see: ['tip-on-word'] },
    { id: 'aventos', name: '아벤토스', en: 'AVENTOS', easy: '블럼의 리프트 시스템(위로 여는 문 장치) 식구 이름', part: ['blum-lift'], see: ['flap'] },
    { id: 'flap', name: '플랩', easy: '위로 여는 문 (상부장 플랩)', from: ['blum-lift'], see: ['aventos', 'flap-stay-word'] },
    { id: 'flap-stay-word', name: '플랩스테이', easy: '위로 여는 문을 받쳐 주는 가스 쇼바. 블럼 리프트의 보통판', part: ['flap-stay'], see: ['flap', 'aventos'] },
    { id: 'underrail', name: '언더레일', easy: '서랍 밑에 다는 레일. 밑에 숨어서 안 보인다', from: ['drawer-hw', 'blum-runner'], see: ['ballrail'] },
    { id: 'ballrail', name: '볼레일', easy: '서랍 옆에 다는 레일. 옆에 보인다', from: ['drawer-hw'], see: ['underrail'] },
    { id: 'one-hole', name: '1홀', easy: '나사 하나로 다는 손잡이', from: ['handle'], see: ['two-hole'] },
    { id: 'two-hole', name: '2홀', easy: '나사 둘로 다는 손잡이. 구멍 간격을 재야 한다', from: ['handle'], see: ['one-hole'] },
    { id: 'flush', name: '매립형', easy: '파묻혀서 겉으로 튀어나오지 않는 것. 손잡이 · 콘센트 · 드레스 시스템에 있다', from: ['handle', 'outlet', 'dress'], see: ['bar-type'] },
    { id: 'bar-type', name: '바형', easy: '긴 막대 모양 손잡이', from: ['handle'], see: ['flush'] },
    { id: 'pull-out', name: '인출식', easy: '당겨 빼는 것', from: ['kitchen-acc'] },
    { id: 'furniture-foot', name: '가구발', easy: '가구 밑의 안 보이는 받침', from: ['legs'], see: ['leg', 'leveler'] },
    { id: 'leg', name: '다리발', easy: '가구 밑의 보이는 다리', from: ['legs'], see: ['furniture-foot', 'leveler'] },
    { id: 'leveler', name: '레벨라', easy: '높이 조절 나사. 수평을 맞춘다', from: ['legs'], see: ['furniture-foot', 'leg'] },
    { id: 'caster', name: '캐스터', easy: '가구 밑에 다는 바퀴', from: ['legs'] },
    { id: 'kickboard', name: '걸레받이', easy: '가구 밑 발을 가리는 것 (발 가리개)', from: ['sink-legs'] },
    { id: 'dowel', name: '다보', easy: '선반을 받치는 핀', from: ['fasteners'], see: ['minifix'] },
    { id: 'minifix', name: '미니픽스 · 라픽스', easy: '판끼리 잇는 체결구', from: ['fasteners'], see: ['dowel'] },
    { id: 'latch', name: '빠찌링', easy: '걸쇠', from: ['misc-hw'] },
    { id: 'built-in', name: '빌트인', easy: '가구에 끼워 넣는 것', from: ['builtin-app', 'cooktop', 'hood'], see: ['free-standing'] },
    { id: 'free-standing', name: '프리스탠딩', easy: '끼우지 않고 올려 놓는 것', from: ['cooktop'], see: ['built-in'] },
    { id: 'highlight', name: '하이라이트', easy: '전기 열선으로 데우는 쿡탑', from: ['cooktop'], see: ['induction', 'hybrid'] },
    { id: 'induction', name: '인덕션', easy: '자기장으로 데우는 쿡탑', from: ['cooktop'], see: ['highlight', 'hybrid'] },
    { id: 'hybrid', name: '하이브리드', easy: '하이라이트와 인덕션이 둘 다 있는 쿡탑', from: ['cooktop'], see: ['highlight', 'induction'] },
    { id: 'under', name: '언더 (싱크볼)', easy: '싱크볼을 상판 밑에 붙이는 것', from: ['sink-bowl'], see: ['reform'] },
    { id: 'reform', name: '리폼 (싱크볼)', easy: '싱크볼을 바꿔 끼우는 것', from: ['sink-bowl'], see: ['under'] },
    { id: 'overflow', name: '오버 플로우', easy: '넘침 방지 부속', from: ['drain'] },
    { id: 'deck-faucet', name: '입수전', easy: '상판에 세우는 수도꼭지', from: ['faucet'], see: ['wall-faucet'] },
    { id: 'wall-faucet', name: '벽수전', easy: '벽에서 나오는 수도꼭지', from: ['faucet'], see: ['deck-faucet'] },
    { id: 'faucet-word', name: '수전', easy: '수도꼭지', from: ['faucet', 'bath'], see: ['deck-faucet', 'wall-faucet'] },
    { id: 'bowl', name: '볼 (싱크볼 · 욕실볼)', easy: '물을 받는 통. 싱크볼은 개수대 통, 욕실볼은 세면대 통', from: ['sink-bowl', 'bath-bowl'] },
    { id: 'mounting-plate', name: '경첩 마운틴', easy: '경첩의 받침판', from: ['hinge'] },
    { id: 'locker-word', name: '락카', easy: '사물함', from: ['locker', 'lock'] },
    { id: 'upper-cabinet', name: '상부장', easy: '벽 위쪽에 다는 장', guess: true, see: ['lower-cabinet', 'tall-cabinet'] },
    { id: 'lower-cabinet', name: '하부장', easy: '바닥에 놓고 위에 상판을 얹는 장', guess: true, see: ['upper-cabinet', 'tall-cabinet'] },
    { id: 'tall-cabinet', name: '키큰장', easy: '바닥부터 위까지 길게 선 장', guess: true, see: ['upper-cabinet', 'lower-cabinet'] },
    { id: 'blum', name: '블럼', en: 'Blum', easy: '오스트리아의 가구 부속 회사. 우리 쇼핑몰에 리프트 · 경첩 · 서랍 · 언더레일 · 푸쉬 언더레일 다섯 묶음이 있다', part: ['blum-lift', 'blum-hinge', 'blum-box', 'blum-runner', 'blum-push'] },
    { id: 'haman', name: '하만', en: 'HM', easy: '문짝 · 손잡이 · 서랍 · 조명 묶음이 있는 브랜드', part: ['haman-lucid', 'haman-nuomi', 'lucid-tbar', 'haman-hydrawer', 'haman-beta'] },
    { id: 'hettich', name: '헤티히', easy: '독일의 가구 부속 브랜드. 우리 쇼핑몰에서는 슬라이딩 · 미닫이 묶음 안에 있다', part: ['sliding'] }
  ];

  // 같은 것, 다른 말 — [다른 말, 넘겨줄 용어 id]
  var ALIASES = [
    ['뎀퍼', 'damper'],
    ['쇼바', 'flap-stay-word'],
    ['가스 쇼바', 'flap-stay-word'],
    ['살살 닫힘', 'damper'],
    ['눌러서 열림', 'push'],
    ['받침판', 'mounting-plate'],
    ['발 가리개', 'kickboard'],
    ['걸쇠', 'latch'],
    ['사물함', 'locker-word'],
    ['수도꼭지', 'faucet-word'],
    ['리프트 시스템', 'aventos']
  ];

  var BLUM = [
    { name: '리프트 시스템 — 아벤토스(AVENTOS)', easy: '위로 여는 문 장치', ours: '리프트 시스템', part: 'blum-lift' },
    { name: '경첩 시스템 — 클립 탑(CLIP top) · 모듈(MODUL)', easy: '여닫이문 관절', ours: '경첩', part: 'blum-hinge' },
    { name: '박스 시스템 — 레그라박스(LEGRABOX) · 텐덤박스(TANDEMBOX) · 메타박스(METABOX)', easy: '금속 서랍 통', ours: '서랍 시스템', part: 'blum-box' },
    { name: '러너 시스템 — 모벤토(MOVENTO) · 텐덤(TANDEM)', easy: '나무 서랍 밑 레일', ours: '언더레일', part: 'blum-runner' },
    { name: '모션 기술 — 팁온(TIP-ON) · 블루모션(BLUMOTION) · 서보 드라이브(SERVO-DRIVE)', easy: '눌러 열림 · 살살 닫힘 · 전동', ours: '푸쉬 언더레일 — 팁온(TIP-ON). 나머지는 경첩 · 서랍 안에 들어 있다', part: 'blum-push' },
    { name: '내부 분할 — 암비아 라인(AMBIA-LINE) · 오르가 라인(ORGA-LINE)', easy: '서랍 속 칸막이', ours: '따로 없음 — 필요하면 주문', guess: true },
    { name: '캐비닛 적용 — 스페이스 타워(SPACE TOWER) · 코너(CORNER) · 스텝(STEP) · 트윈(TWIN) · 싱크대', easy: '코너 · 키큰장 · 좁은 장을 쓰는 법', ours: '따로 없음 — ⑤ 주방 악세사리와 겹친다' },
    { name: '포켓 시스템 — 레베고(REVEGO)', easy: '문이 옆 주머니로 들어감', ours: '없음' },
    { name: '추가 제품 — 카블록스(CABLOXX) · 얇은 프런트 익스판도 T(EXPANDO T)', easy: '서랍 잠금 · 얇은 문짝 고정', ours: '없음 (잠금은 ⑦ 에 다른 브랜드)' },
    { name: '조립 장치 — 미니프레스(MINIPRESS) · 이지스틱(EASYSTICK) · 에코드릴(ECODRILL) · 템플릿', easy: '공장 · 현장에서 피팅을 다는 기계와 지그', ours: '없음' }
  ];

  // ---- 찾기 도우미 — 네 쪽이 같이 쓴다 ----
  var NUM = ['', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
  function part(id) { for (var i = 0; i < PARTS.length; i++) if (PARTS[i].id === id) return PARTS[i]; return null; }
  function group(no) { return GROUPS[no - 1] || null; }
  function word(id) { for (var i = 0; i < WORDS.length; i++) if (WORDS[i].id === id) return WORDS[i]; return null; }
  // 안에 든 것 — sets 가 있으면 펴서 한 줄로
  function itemsOf(p) {
    if (p.items) return p.items;
    var out = [];
    (p.sets || []).forEach(function (s) { s[1].forEach(function (x) { out.push(x); }); });
    return out;
  }
  function item(p, id) {
    var xs = itemsOf(p);
    for (var i = 0; i < xs.length; i++) if (typeof xs[i] === 'object' && xs[i].id === id) return xs[i];
    return null;
  }
  function label(x) { return typeof x === 'string' ? x : x.name + (x.en ? '(' + x.en + ')' : ''); }
  // 부품 하나에 3D 가 있나 — 따로 쪽이 있는 칸 가운데 모형이 있는 첫 칸
  function modelItem(p) {
    var xs = itemsOf(p);
    for (var i = 0; i < xs.length; i++) if (typeof xs[i] === 'object' && xs[i].model) return xs[i];
    return null;
  }
  // 다른 말 → 용어. 이름 · id 도 받는다
  function resolve(q) {
    q = (q || '').trim();
    if (!q) return null;
    var w = word(q);
    if (w) return { word: w };
    for (var i = 0; i < WORDS.length; i++) if (WORDS[i].name === q) return { word: WORDS[i] };
    for (var j = 0; j < ALIASES.length; j++) if (ALIASES[j][0] === q) return { word: word(ALIASES[j][1]), from: q };
    return null;
  }
  function aliasesOf(id) { return ALIASES.filter(function (a) { return a[1] === id; }).map(function (a) { return a[0]; }); }

  root.UBO_TERMS = {
    GROUPS: GROUPS, PARTS: PARTS, WORDS: WORDS, ALIASES: ALIASES, BLUM: BLUM, NUM: NUM,
    part: part, group: group, word: word, itemsOf: itemsOf, item: item, label: label, modelItem: modelItem, resolve: resolve, aliasesOf: aliasesOf
  };
})(typeof window !== 'undefined' ? window : this);
