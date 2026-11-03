// 용어 · 부품 데이터 한 벌 — 용어 칸(terms.html · term.html)과 부품 칸(parts.html · part.html)이 같이 읽는다.
//   GROUPS  가구 한 짝의 자리 ①~⑩ — 부품 칸의 줄
//   PARTS   쇼핑몰 분류 — 이름은 실무자가 쓰는 말 그대로 둔다
//           tag 'b' = 브랜드 이름이 분류 이름 · 'i' = 수입 묶음
//           guess = 쉬운 말이 (추정) — 상품 설명을 아직 확인하지 않은 것
//           moves = 움직이는 부품 → 3D 로 보여 줄 것, 아니면 사진
//           items = 「안에 든 것」. 문자열 하나가 한 칸, 따로 쪽이 있는 것만 { id, name, en, note(고급 · 기본 같은 덧말), model, openSeconds, modelNote(모형 안내) }
//           sets  = 안에 든 것이 둘로 나뉠 때 [이름, [칸 …]]
//           model · openSeconds · target · radius · modelNote 를 분류 칸에 바로 적으면 그 분류의 대표 모형 (식구 칸의 모형이 먼저)
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
          openSeconds: 1, modelNote: '단순하게 만든 모형이라 실제 제품의 치수 · 장치 모양과 다르다',
          // 고르기 판 (part.html, 사용자 11-02 A안) — 장 크기 · 문 · 색을 고르면 모형과 맞는 강도가 바뀐다.
          // 힘 숫자 = 장 높이(mm) × 문 두 쪽 무게(kg, 손잡이 포함) 는 블럼 자료. 강도 범위 · 색 · 재질 무게는 추정 (회사 확인 전)
          pick: {
            model: '3d/hf-h{h}.glb', heights: [500, 600, 700, 800, 900, 1000], modelWidth: 900,   // build_hf.py --height
            h: [480, 1040], w: [400, 1800],
            start: { h: 700, w: 900, mat: 'mdf', handle: '1', door: 'oak', body: 'white', cap: 'silk' },
            paint: { door: '문', body: '몸통', cap: '리프트 장치' },   // 고르는 색 → 모형의 재질 이름
            mat: [
              { id: 'pb', name: 'PB(파티클보드) 18mm', kgm2: 12 },
              { id: 'mdf', name: 'MDF 도장 19mm', kgm2: 14 },
              { id: 'glass', name: '알루미늄 틀 + 유리', kgm2: 10 }
            ],
            handle: [{ id: '1', name: '손잡이 있음', kg: 0.3 }, { id: '0', name: '손잡이 없음 (밀어서 열기)', kg: 0 }],
            door: [
              { id: 'white', name: '화이트', hex: '#F2F0EB' }, { id: 'grey', name: '웜그레이', hex: '#A9A39A' },
              { id: 'oak', name: '오크', hex: '#C9A27A' }, { id: 'walnut', name: '월넛', hex: '#6E4B33' }, { id: 'black', name: '블랙', hex: '#2E2D2B' }
            ],
            body: [{ id: 'white', name: '화이트', hex: '#EEEAE3' }, { id: 'grey', name: '그레이', hex: '#BDB8AF' }, { id: 'oak', name: '오크', hex: '#D8BC98' }],
            cap: [{ id: 'silk', name: '실크화이트', hex: '#ECEBE6' }, { id: 'lgrey', name: '라이트그레이', hex: '#B4B8BC' }, { id: 'black', name: '테라블랙', hex: '#3A3A3A' }],
            power: [{ id: 'HF 22', min: 2600, max: 5500 }, { id: 'HF 25', min: 5350, max: 10150 }, { id: 'HF 28', min: 9000, max: 17250 }],
            hinges: [{ w: 1800, kg: 20, n: 4 }, { w: 1200, kg: 12, n: 3 }], hingesMin: 2   // 두 문을 잇는 가운데 경첩 — 블럼 자료
          } },
        { id: 'hs', name: '위로 올림', en: 'HS', model: '3d/hs.glb?v=2', openSeconds: 1, target: '0m 0.48m -0.15m', radius: '2m', guess: true,
          easy: '문이 바깥으로 젖혀지며 올라가 장 위로 넘어간다', modelNote: '문이 지나는 길은 짐작으로 그렸다. 움직임은 회사 확인 전이다. 단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다' },
        { id: 'hl', name: '평행', en: 'HL', model: '3d/hl.glb?v=2', openSeconds: 1, target: '0m 0.48m -0.15m', radius: '2m', guess: true,
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

  // 분류마다 대표 3D 모형 — 사용자 11-02 「각 제품들 모두 3D」. 아래에서 PARTS 의 같은 id 칸에 붙인다 (부품 쪽 칸)
  // 모양 · 움직임은 짐작이 섞였다 — 회사 확인 전. 만드는 스크립트는 3d/build_*.py (README 의 3D)
  var END = '단순하게 만든 모형이라 실제 제품의 치수 · 모양과 다르다';
  var PART_MODELS = {
    // ① 문짝 · 판 · ④ 손잡이 — build_panels_handles.py
    'woodgrain': { target: '0m 0.39m -0.01m', radius: '2.1m', modelNote: '색과 크기가 다른 나무결 문짝 세 장이다. 결은 앞 · 뒤 면에 물결 줄로 그렸다' },
    'slimline-tu': { openSeconds: 1, v: 2, target: '-0.05m 0.4m 0.07m', radius: '1.9m', modelNote: '얇은 알루미늄 틀에 유리를 끼운 문을 장 하나에 달았다. 문이 왼쪽 경첩을 축으로 열렸다 닫히고, 유리 너머로 선반과 그릇이 보인다. 틀 굵기는 짐작이다' },
    'multilayer': { target: '-0.07m 0.23m 0.04m', radius: '1.2m', modelNote: '얇은 판을 여러 겹 붙인 문짝을 세우고, 같은 판을 앞에 눕혀 모서리의 겹이 보이게 했다. 겹은 보이게 실물보다 두껍게 그렸다' },
    'haman-lucid': { openSeconds: 1, v: 2, target: '0m 0.35m 0.09m', radius: '2.1m', modelNote: '반짝이는 문 두 짝에 얇은 금속 테를 두른 모양으로 짐작했다. 두 짝이 양쪽 끝을 축으로 바깥으로 열린다. 앞 바닥의 손잡이 · 경첩은 따로 사는 구성품을 짐작해 그렸다' },
    'haman-nuomi': { openSeconds: 1, v: 2, target: '-0.03m 0.98m -0.03m', radius: '3.8m', modelNote: '왼쪽은 주방 하부장 문(테두리가 도드라진 문), 오른쪽은 붙박이장의 키 큰 문(가로 홈 둘)이다. 두 문이 서로 반대쪽으로 열린다. 시리즈마다의 실제 모양 · 색은 짐작이다' },
    'panel-colors': { openSeconds: 1, v: 2, target: '0m 0.21m -0.03m', radius: '1.1m', modelNote: '견본 칩 열세 장을 핀 하나로 묶은 색상표다. 닫히면 한 묶음으로 겹치고, 열리면 부채처럼 펼쳐진다. 왼쪽부터 알루미늄 도어 · 스티커 · 대리석 · 손잡이 색이고, 색은 짐작이다' },
    'plywood': { target: '0.01m 0.4m -0.02m', radius: '1.7m', modelNote: '합판 석 장을 쌓고 한 장은 뒤에 세웠다. 앞 모서리에 겹이 보인다. 겹은 보이게 실물보다 두껍게 그렸다' },
    'handle': { openSeconds: 1, v: 2, target: '-0.04m 0.2m 0.02m', radius: '2m', modelNote: '작은 문 넷에 손잡이를 하나씩 달았다 — 왼쪽부터 1홀(꼭지) · 2홀(짧은 손잡이) · 매립형(파묻힘) · 바형(긴 막대). 문은 손잡이 반대쪽 끝(뒤의 얇은 옆판)을 축으로 열리고, 열리면 뒷면의 나사가 하나 · 둘 보인다' },
    'special-bar': { openSeconds: 1, v: 2, target: '0m 0.45m 0.11m', radius: '2.2m', modelNote: '문 두 짝에 긴 바 손잡이를 달았다 — 왼쪽 포그 그레이, 오른쪽 크림 화이트. 두 짝이 바깥 끝(뒤의 얇은 옆판)을 축으로 양쪽으로 열린다. 색은 짐작이다' },
    'lucid-tbar': { openSeconds: 1, v: 2, target: '-0.05m 0.36m 0.1m', radius: '1.6m', modelNote: '루시드 문 한 짝에 T바를 달았다 — 둥근 막대가 다리 둘에 떠 있어 옆에서 보면 T 자다. 문이 왼쪽 끝(뒤의 얇은 옆판)을 축으로 열리고, 열리면 뒷면의 나사 둘이 보인다. 문 모양은 짐작이다' },
    'import-handle': { openSeconds: 1, v: 2, target: '-0.04m 0.45m -0.01m', radius: '2.2m', modelNote: '장 하나에 수입 손잡이 셋을 달았다 — 키 큰 문의 장바, 위 서랍의 매립 손잡이, 가운데 서랍 2홀 · 아래 문 1홀. 키 큰 문이 열리고 위 · 가운데 서랍이 앞으로 빠진다(아래 문은 닫힌 채). 금색은 짐작이다' },
    // ② 경첩 · 리프트 · 미닫이 · ③ 서랍 — build_moving_more.py (움직인다)
    'blum-hinge': { openSeconds: 1, target: '-0.07m 0.18m 0.01m', radius: '1.2m', modelNote: '문 뒷면에 박힌 둥근 컵, 옆판의 십자 클립 판, 그 판에 끼운 팔을 그렸다. 팔 위의 파란 통이 블루모션(살살 닫힘)이라 닫힐 때 끝에서 느려진다. 경첩은 실물보다 크게 그리고 마디 움직임은 줄였다. 110° 까지 열린다는 것은 짐작이다. 오른쪽 옆판과 윗판은 비치게 그렸다' },
    'flap-stay': { openSeconds: 1, target: '0m 0.22m 0.03m', radius: '1.5m', modelNote: '위로 여는 문과 양옆의 가스 쇼바를 그렸다. 문이 열리면 쇼바의 밝은 막대가 진한 통에서 늘어난다. 90° 까지 열리는 것과 쇼바가 붙는 자리는 짐작이다. 오른쪽 옆판은 비치게 그렸다' },
    'sliding': { openSeconds: 1, target: '0m 0.28m -0.2m', radius: '2m', modelNote: '문 두 짝이 위 · 아래의 두 줄 레일을 타고, 앞 문이 옆으로 밀려 뒤 문과 겹친다. 바퀴는 아래 레일 위를 구르고, 위 레일의 홈이 문 윗변을 잡는다. 헤티히 제품의 실제 모양은 몰라 흔한 미닫이 부속으로 짐작했다' },
    'blum-box': { openSeconds: 1, target: '0m 0.11m -0.01m', radius: '1.6m', modelNote: '얇고 판판한 금속 옆판과 금속 뒤판, 바닥판으로 된 서랍 통을 그렸다(레그라박스 비슷한 모양). 레일은 옆판 밑에 숨어 있고, 서랍이 끝까지 빠지며 닫힐 때 끝에서 살살 닫힌다. 텐덤박스 · 메타박스는 옆판 모양이 다르다. 오른쪽 옆판과 윗판은 비치게 그렸다' },
    'blum-runner': { openSeconds: 1, target: '0m 0.12m -0.01m', radius: '1.6m', modelNote: '나무 서랍 통 밑에 숨는 레일 세 겹(몸통 쪽 · 가운데 · 서랍 쪽)을 그렸다. 서랍은 끝까지 빠진다. 앞쪽 파란 잠금 장치로 서랍을 끼우고 빼며, 뒤쪽 댐퍼 덕에 끝에서 살살 닫힌다. 오른쪽 옆판과 윗판은 비치게 그렸다. 「옆에서」 로 보면 레일이 보인다' },
    'blum-push': { openSeconds: 1, target: '0m 0.12m -0.04m', radius: '1.6m', modelNote: '손잡이 없는 서랍이다. 앞판을 살짝 누르면 뒤의 팁온 장치가 막대로 서랍을 밀어내고, 그다음 손으로 끝까지 뺀다. 밀어 넣으면 끝에서 살살 닫힌다. 누르는 거리와 튀어나오는 거리는 짐작이다. 오른쪽 옆판과 윗판은 비치게 그렸다' },
    'bona-box': { openSeconds: 1, target: '0m 0.14m -0.01m', radius: '1.7m', modelNote: '윗변이 둥근 낮은 금속 옆판 위로 둥근 봉 두 줄을 올린 서랍 통을 그렸다. 보나박스 자료가 없어 흔한 금속 서랍 통 모양으로 짐작했다. 레일이 옆판 밑에 숨는 것과 살살 닫히는 것도 짐작이다' },
    'haman-hydrawer': { openSeconds: 1, target: '0m 0.15m -0.01m', radius: '1.7m', modelNote: '낮은 진회색 금속 옆판 위에 유리 옆판을 올린 높은 서랍 통을 그렸다. 하이드로워 자료가 없어 이름(하이 드로워 = 높은 서랍)으로 모양을 짐작했다. 레일이 옆판 밑에 숨는 것과 살살 닫히는 것도 짐작이다' },
    // ⑤ 안쪽 수납 · 선반 · ⑥ 발 · 철제 — build_storage_legs.py
    'kitchen-acc': { openSeconds: 1, target: '0m 0.38m -0.05m', radius: '2.1m', modelNote: '하부장에서 당겨 빼는 인출식 망장(철망 바구니 두 단)을 그렸다. 오른쪽 옆판을 비치게 해 레일이 보인다' },
    'total-shelf': { target: '0m 0.73m -0.28m', radius: '2.6m', modelNote: '하부장 상판 위에 기둥 둘을 세우고 철망 선반 두 단을 끼운 기둥식 보조선반을 그렸다' },
    'shelf': { target: '0m 0.4m -0.13m', radius: '1.7m', modelNote: '벽에 ㄱ자 받침 둘로 단 나무 선반을 그렸다' },
    'built-in-shoe': { openSeconds: 1, target: '-0.02m 0.45m 0.06m', radius: '2.4m', modelNote: '신발장 안의 비스듬한 신발 선반 두 단이 레일을 타고 당겨 나온다. 문은 열어 둔 채로 두었다. 붙박이용 부속은 아직 그리지 않았다' },
    'dress': { target: '0m 1m -0.22m', radius: '3.4m', modelNote: '벽붙이형을 그렸다 — 벽 레일에 기둥 셋을 걸고, 왼쪽 칸은 옷봉, 오른쪽 칸은 선반 넷이다' },
    'import-storage': { openSeconds: 1, target: '0m 0.9m -0.02m', radius: '4.3m', modelNote: '키큰장 문 뒤에 다섯 단 바구니가 달린 틀이 통째로 당겨 나오는 인출장을 대표로 그렸다. 주방 · 붙박이 · 신발장 가운데 무엇을 대표로 할지는 짐작이다' },
    'legs': { openSeconds: 1, v: 2, target: '0m 0.14m -0.17m', radius: '0.95m', modelNote: '낮은 장의 네 귀퉁이에 하나씩 달았다 — 앞 왼쪽 다리발, 앞 오른쪽 캐스터, 뒤 오른쪽 레벨라, 뒤 왼쪽 가구발(안쪽에 숨어 있어 돌려 봐야 보인다). 열면 레벨라 받침이 한 바퀴 돌며 3cm 올라가고, 캐스터 바퀴는 장을 앞으로 밀 때처럼 한 바퀴 구른다 — 장은 그대로 두고 바퀴만 돈다. 레벨라는 「옆에서」 로 보면 또렷하다. 올라가는 높이는 실물보다 크게 그렸고, 가구발 · 레벨라 모양과 움직임은 짐작이다' },
    'sink-legs': { openSeconds: 1, v: 2, target: '0m 0.42m -0.24m', radius: '2.1m', modelNote: '싱크 하부장 밑의 플라스틱 발 넷과, 앞 발에 클립(파란색)으로 끼운 걸레받이 판(비치게)을 그렸다. 열면 판의 윗변이 앞으로 젖혀져 클립에서 빠지고 앞으로 당겨 나오며, 닫으면 거꾸로 다시 끼워진다. 클립 모양과 빼는 순서는 짐작이다' },
    'custom-steel': { target: '0m 0.37m -0.3m', radius: '2.1m', modelNote: '치수대로 만드는 철제 가운데 테이블을 그렸다 — 검은 네모 철관 다리 · 틀 위에 나무 상판' },
    // ⑦ 잠금 · 락카 · 사무가구 · ⑧ 피스 · 전기 — build_lock_small_electric.py. 작은 철물은 실물보다 크게 그렸다
    'lock': { openSeconds: 1, target: '-0.03m 0.21m -0.05m', radius: '1.25m', modelNote: '문짝 앞의 열쇠 구멍(실린더)과 문 뒤의 걸쇠를 그렸다. 열쇠를 돌리면 걸쇠가 위로 돌아 풀리고 문이 열린다. 오른쪽 옆판을 비치게 그려 「옆에서」 로 걸쇠가 받이에 걸린 것을 본다. 열쇠로 여는 잠금으로 대표했고(디지털 · 번호 · 다이얼키 등은 아직 안 그림), 자물쇠는 실물보다 조금 크게 그렸다' },
    'locker': { openSeconds: 1, v: 2, target: '0.03m 0.18m 0.02m', radius: '1.5m', modelNote: '사물함 두 칸의 문에 둥근 번호판과 명찰꽂이를 달고, 2번 칸 열쇠에 번호고리와 번호표를 걸었다. 2번 문이 먼저, 1번 문이 조금 늦게 오른쪽 모서리를 축으로 열린다. 스티커 · 밴드는 따로 그리지 않았고, 모양은 흔한 제품으로 짐작했다' },
    'oa': { openSeconds: 1, target: '0m 0.03m -0.2m', radius: '0.85m', modelNote: '사무용 부속 가운데 회전판을 대표로 그렸다. 밑판과 윗판 사이에 끼운 쇠판 두 장이 돌아 윗판이 돈다. 윗판은 비치게, 회전판 두께는 실물보다 두껍게 그렸고, 사물함 경첩은 그리지 않았다' },
    'fasteners': { openSeconds: 1, v: 2, target: '-0.01m 0.14m -0.12m', radius: '1m', modelNote: '판 두 장이 직각으로 만나는 밑 모서리에 미니픽스(둥근 캠 + 옆판에서 나온 볼트), 선반 밑에 다보 핀, 오른쪽 옆판 바깥에 피스 머리와 피스캡을 그렸다. 처음엔 왼쪽 옆판이 떨어져 있다 — 옆판을 밀어 볼트가 캠에 들어가면 캠이 돌며 볼트를 당겨 판 두 장이 붙는다. 밑판 · 선반은 비치게, 철물은 실물보다 1.4배쯤 크게, 떨어진 틈도 실물보다 크게 그렸다. 꺽쇠 · 라픽스 · 케이싱은 그리지 않았다' },
    'misc-hw': { openSeconds: 1, target: '-0.04m 0.19m -0.03m', radius: '1.25m', modelNote: '문 위의 걸쇠(빠찌링)와 스토퍼를 그렸다. 빠찌링 손잡이를 젖히면 고리가 상판의 턱에서 풀리고 문이 열린다. 문이 열리면 보이는 옆판 앞의 검은 점이 스토퍼다. 빠찌링 · 스토퍼 모양은 짐작이고, 철물은 실물보다 크게 그렸다' },
    'outlet': { openSeconds: 1, v: 2, target: '0.02m 0.28m -0.15m', radius: '1.45m', modelNote: '하부장 상판의 매립형 콘센트가 위로 솟아올라 앞면의 두 구가 드러난다(누르면 올라오는 팝업형으로 짐작). 장 오른쪽 옆판에는 돌출형 콘센트(두 구, 전선이 밑으로), 상판 뒤에는 전선캡을 그렸다. 모양은 짐작이다' },
    'lighting': { target: '0m 0.46m -0.08m', radius: '2.1m', modelNote: '벽에 단 상부장 밑 앞쪽에 긴 막대 조명을 붙였다. 아래 상판으로 퍼지는 줄기는 알아보기 쉽게 그린 빛이다. 할로겐(둥근 조명)은 그리지 않았다' },
    'haman-beta': { target: '0m 0.3m -0.12m', radius: '1.45m', modelNote: '열린 선반장의 선반 앞 끝에 LED 띠를 묻었다. 부속으로 선반 밑을 지나는 전선, 밑칸 뒤의 전원 장치, 옆판 앞의 스위치를 그렸다. 띠가 붙는 자리와 부속은 짐작이다' },
    // ⑨ 주방 가전 · ⑩ 싱크 · 수전 · 욕실 — build_appliance_sink.py. 브랜드 로고 · 특정 제품 모양은 넣지 않았다
    'hood': { target: '0m 1.2m -0.29m', radius: '3.6m', modelNote: '벽에 붙은 굴뚝형(데코) 렌지후드다. 밑에 하부장 · 상판 · 쿡탑을 같이 그려 쿡탑 위 벽에 다는 것을 보인다' },
    'cooktop': { target: '0m 0.66m -0.3m', radius: '2.1m', modelNote: '상판에 박힌 쿡탑 두 개를 나란히 그렸다. 왼쪽은 가스(버너 · 삼발이 · 손잡이), 오른쪽은 인덕션(검은 유리 위 원 무늬 · 터치 자리)이다. 버너 수와 놓인 자리는 짐작이다' },
    'builtin-app': { openSeconds: 1, target: '0m 0.44m 0.07m', radius: '3.1m', modelNote: '하부장 줄에 끼운 빌트인 오븐과 식기세척기다. 문이 아래 경첩으로 앞으로 눕고, 안의 석쇠와 바구니가 보인다' },
    'lg': { openSeconds: 1, target: '0.04m 1.1m -0.01m', radius: '4.8m', modelNote: '키큰장 가운데 칸에 끼운 광파오븐과 옆 하부장 자리의 하부 냉장고다. 로고는 넣지 않았다. 광파오븐 문이 옆으로 열리는 것은 짐작이다' },
    'import-app': { target: '0m 1.22m -0.45m', radius: '3.8m', modelNote: '아일랜드 위 천장에 매단 후드다(납작한 갓과 천장까지 이어진 굴뚝). 천장은 비치게 그렸다. 브랜드별 모양은 넣지 않은 일반 모양이다' },
    'sink-bowl': { openSeconds: 1, v: 2, target: '0m 0.58m -0.08m', radius: '2.4m', modelNote: '싱크장 문 두 짝이 닫혀 있다가 양쪽으로 열린다. 그러면 비치게 그린 상판 밑에 붙은 언더 사각볼과 그 밑 배수관이 보인다' },
    'drain': { target: '0m 0.6m -0.3m', radius: '1.4m', modelNote: '볼 바닥의 배수구(거름망)와 그 밑 몸통, U 자로 꺾인 트랩, 벽으로 가는 관을 그렸다. 볼 뒤벽 위쪽에는 오버 플로우 구멍과 관이 있다. 싱크장 오른쪽 옆판은 비치게 했다. 관이 지나는 길은 짐작이다' },
    'faucet': { openSeconds: 1, target: '0m 1.02m -0.4m', radius: '1.5m', modelNote: '상판에 세운 싱크 입수전이다. 옆 손잡이를 들면 물이 나온다' },
    'bath': { openSeconds: 1, v: 2, target: '0.05m 1.17m -0.2m', radius: '2.9m', modelNote: '거울 욕실장 문 두 짝이 닫혀 있다가 양쪽으로 열려 안의 선반 두 단이 보인다. 그 밑에 벽에서 나온 세면대 수전(벽수전), 벽에 단 하부장 · 도기 세면대, 옆에 수건걸이를 같이 그렸다' },
    'bath-bowl': { target: '0m 0.95m -0.26m', radius: '2.1m', modelNote: '벽에 받침대로 단 세면대 상판 위에 둥근 도기 탑볼을 올렸다. 뒤에 키 큰 수전, 밑에 배수관과 병 모양 트랩을 그렸다' }
  };
  PARTS.forEach(function (p) {
    var m = PART_MODELS[p.id];
    if (!m || p.model) return;
    p.model = '3d/' + p.id + '.glb?v=' + (m.v || 1);
    // 움직이지 않는 모형은 카메라를 모형 크기에 자동으로 맞춘다 — 적어 둔 거리는 화면 비율에 따라 위아래가 잘렸다 (11-02).
    // 움직이는 모형은 열렸을 때까지 들어오게 적어 둔 가운데 · 거리를 쓴다
    p.target = m.openSeconds ? m.target : 'auto auto auto';
    p.radius = m.openSeconds ? m.radius : 'auto';
    if (m.openSeconds) p.openSeconds = m.openSeconds;
    p.modelNote = m.modelNote + '. ' + (m.openSeconds ? '움직임은 회사 확인 전이다. ' : '') + END;
  });

  // 오른쪽 고르기 판 (사용자 11-03 「ㄱㄱ」) — HF 의 pick 이 없는 부품 한 장에 붙는다. 부품 칸이 PARTS 에 매달아 part.html 이 읽는다
  // ① 색 고르기 — 모형의 재질 이름으로 찾아 칠한다. 모형에 그 재질이 있는 줄만 보인다. 색은 예시 — 실제 파는 색 · 마감은 회사 확인 전
  var PAINT = [
    { id: 'door', name: '문 색', mats: ['문', '문 · 앞판'], colors: [
      { id: 'white', name: '화이트', hex: '#F2F0EB' }, { id: 'grey', name: '웜그레이', hex: '#A9A39A' }, { id: 'oak', name: '오크', hex: '#C9A27A' },
      { id: 'walnut', name: '월넛', hex: '#6E4B33' }, { id: 'black', name: '블랙', hex: '#2E2D2B' }] },
    { id: 'body', name: '몸통 색', mats: ['몸통'], colors: [
      { id: 'white', name: '화이트', hex: '#EEEAE3' }, { id: 'grey', name: '그레이', hex: '#BDB8AF' }, { id: 'oak', name: '오크', hex: '#D8BC98' }, { id: 'black', name: '블랙', hex: '#3A3936' }] },
    { id: 'hw', name: '손잡이 색', mats: ['손잡이'], colors: [
      { id: 'black', name: '블랙', hex: '#2B2B2B' }, { id: 'silver', name: '실버', hex: '#C9CCCF' }, { id: 'gold', name: '골드', hex: '#B89B5E' }, { id: 'white', name: '화이트', hex: '#EDEDED' }] },
    { id: 'shelf', name: '선반 색', mats: ['선반'], colors: [
      { id: 'white', name: '화이트', hex: '#F2F0EB' }, { id: 'oak', name: '오크', hex: '#C9A27A' }, { id: 'walnut', name: '월넛', hex: '#6E4B33' }, { id: 'grey', name: '그레이', hex: '#A9A39A' }] },
    { id: 'top', name: '상판 색', mats: ['상판', '세면대 상판', '나무 상판'], colors: [
      { id: 'stone', name: '그레이 스톤', hex: '#8A8A87' }, { id: 'marble', name: '화이트 마블', hex: '#E9E7E2' }, { id: 'black', name: '블랙', hex: '#2F2F30' }, { id: 'oak', name: '오크', hex: '#C9A27A' }] }
  ];
  // ② 맞는 규격 찾기 — 치수를 넣으면 맞는 것이 나온다. 규칙은 흔한 업계 기준으로 채운 추정 (회사 확인 전)
  var FITS = {
    // 서랍 레일 — 장 안쪽 깊이에서 여유를 빼고 들어가는 가장 긴 표준 길이
    rail: { type: 'rail', depth: [280, 700], start: 500, lengths: [250, 300, 350, 400, 450, 500, 550, 600], margin: 10 },
    // 경첩 — 문 높이로 개수, 문이 옆판을 덮는 모양으로 종류. 무거운 문은 하나 더
    hinge: { type: 'hinge', height: [300, 2400], start: 720,
      counts: [{ upTo: 900, n: 2 }, { upTo: 1600, n: 3 }, { upTo: 2000, n: 4 }, { upTo: 2400, n: 5 }],
      cover: [
        { id: 'full', name: '전체 덮음', kind: '일자', easy: '문이 옆판 앞면을 다 덮는다 (아웃도어)' },
        { id: 'half', name: '반 덮음', kind: '반곡', easy: '옆판 하나를 양쪽 문 둘이 반씩 나눠 덮는다' },
        { id: 'in', name: '인도어', kind: '대곡', easy: '문이 몸통 안에 쏙 들어가 옆판 앞면이 보인다' }],
      weight: [{ id: 'normal', name: '보통 문', plus: 0 }, { id: 'heavy', name: '무거운 문 (유리 · 거울 · 두꺼운 문)', plus: 1 }] }
  };
  var FIT_OF = { 'drawer-hw': 'rail', 'blum-box': 'rail', 'blum-runner': 'rail', 'blum-push': 'rail', 'bona-box': 'rail', 'haman-hydrawer': 'rail', 'hinge': 'hinge', 'blum-hinge': 'hinge' };
  PARTS.forEach(function (p) {
    p.paint = PAINT;
    if (FIT_OF[p.id]) p.fit = FITS[FIT_OF[p.id]];
  });

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
    { id: 'blum-ambia', g: 3, name: '내부 분할 — 암비아 라인(AMBIA-LINE) · 오르가 라인(ORGA-LINE)', easy: '서랍 속 칸막이', ours: '따로 없음 — 필요하면 주문', guess: true },
    { id: 'blum-space-tower', g: 5, name: '캐비닛 적용 — 스페이스 타워(SPACE TOWER) · 코너(CORNER) · 스텝(STEP) · 트윈(TWIN) · 싱크대', easy: '코너 · 키큰장 · 좁은 장을 쓰는 법', ours: '따로 없음 — ⑤ 주방 악세사리와 겹친다' },
    { id: 'blum-revego', g: 2, name: '포켓 시스템 — 레베고(REVEGO)', easy: '문이 옆 주머니로 들어감', ours: '없음' },
    { id: 'blum-cabloxx', g: 3, name: '추가 제품 — 카블록스(CABLOXX) · 얇은 프런트 익스판도 T(EXPANDO T)', easy: '서랍 잠금 · 얇은 문짝 고정', ours: '없음 (잠금은 ⑦ 에 다른 브랜드)' },
    { id: 'blum-minipress', g: 8, name: '조립 장치 — 미니프레스(MINIPRESS) · 이지스틱(EASYSTICK) · 에코드릴(ECODRILL) · 템플릿', easy: '공장 · 현장에서 피팅을 다는 기계와 지그', ours: '없음' }
  ];
  // 우리 쇼핑몰에 없는 블럼 묶음의 대표 3D (사용자 11-03 「다 만들어」) — part.html?b=<id> 로 연다. 만드는 스크립트 3d/build_blum_more*.py
  // 모양 · 움직임은 짐작이다 (회사 확인 전). 값은 모형을 만든 뒤 채운다 — 비어 있으면 3D 없이 줄만 보인다
  var BLUM_MODELS = {
    // build_blum_more.py
    'blum-ambia': { openSeconds: 1, target: '0m 0.12m -0.01m', radius: '1.7m', modelNote: '하부장 서랍이 앞으로 빠지면 서랍 속 칸막이가 보인다. 긴 가로 칸막이가 앞(수저 칸)과 뒤(그릇 칸)를 나누고, 세로 칸막이 넷이 수저 칸을 다섯으로 나눈다. 숟가락 · 포크 · 칼 · 젓가락과 그릇 셋을 놓았다. 칸 나누기와 칸막이 모양은 짐작이다(틀로 나누는 암비아 쪽으로 그렸다)' },
    'blum-revego': { openSeconds: 1, target: '0m 0.36m -0.05m', radius: '2.2m', modelNote: '장 앞의 문 두 짝이 앞으로 90° 열린 뒤, 양옆 옆판 안쪽의 주머니로 밀려 들어가 숨는다. 주머니 안의 위 · 아래 레일을 타는 틀에 경첩이 붙어 있어 문과 같이 들어간다. 양 옆판과 윗판은 비치게 그렸다. 경첩 마디 움직임은 줄여 그렸다' },
    'blum-cabloxx': { openSeconds: 1, target: '0m 0.3m -0.03m', radius: '1.8m', modelNote: '서랍 셋이 있는 장에서 가운데 서랍이 빠지면, 옆판 안쪽 뒤의 파란 세로 잠금 막대가 올라가 위 · 아래 서랍을 막는다(카블록스 — 한 번에 서랍 하나만 열림). 가운데 서랍 뒷면에는 얇은 문짝을 잡는 둥근 고정 부품(익스판도 T) 넷을 붙였다. 오른쪽 옆판과 윗판은 비치게 그렸고, 「옆에서」 로 보면 잠금 막대가 보인다. 잠금 방식과 부품 모양은 짐작이다' },
    // build_blum_more2.py
    'blum-space-tower': { openSeconds: 1, target: '0m 0.9m -0.01m', radius: '3m', modelNote: '좁은 키큰장(스페이스 타워)을 그렸다. 앞판을 당기면 뒤의 틀(서랍 다섯 단, 단마다 병 · 통)이 통째로 앞으로 빠져나오고, 닫힐 때 끝에서 살살 닫힌다. 오른쪽 옆판을 비치게 해 위 · 아래 레일이 보인다. 서랍 모양 · 레일 자리 · 한 번에 빠지는 방식은 짐작이고, 코너 · 스텝 · 트윈은 아직 그리지 않았다' },
    'blum-minipress': { openSeconds: 1, target: '0m 0.73m -0.16m', radius: '2.6m', modelNote: '작업대 위의 경첩 구멍 뚫는 기계(미니프레스)를 그렸다 — 받침 판, 세운 기둥, 오른쪽 레버, 드릴 날 셋이 달린 머리. 받침 위에 문짝 한 장을 눕혀 뒤 끝을 자에 댔다. 레버를 내리면 머리가 기둥을 타고 내려와 날 끝이 문짝 윗면에 닿는다(가운데 굵은 날 = 경첩 컵 구멍). 기계 모양 · 크기와 레버 · 머리를 잇는 장치는 짐작이고, 날 간격은 잘 보이게 넓혔다. 이지스틱 · 에코드릴 · 템플릿은 그리지 않았다' }
  };
  BLUM.forEach(function (b) {
    var m = b.id && BLUM_MODELS[b.id];
    if (!m) return;
    b.model = '3d/' + b.id + '.glb?v=' + (m.v || 1);
    b.target = m.openSeconds ? m.target : 'auto auto auto';
    b.radius = m.openSeconds ? m.radius : 'auto';
    if (m.openSeconds) b.openSeconds = m.openSeconds;
    b.modelNote = m.modelNote + '. ' + (m.openSeconds ? '움직임은 회사 확인 전이다. ' : '') + END;
    b.brand = '블럼'; b.tag = 'b'; b.items = []; b.isBlum = true;
    b.paint = PAINT;
  });

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
  // 부품 하나에 3D 가 있나 — 따로 쪽이 있는 칸 가운데 모형이 있는 첫 칸, 없으면 분류 자신의 대표 모형
  function modelItem(p) {
    var xs = itemsOf(p);
    for (var i = 0; i < xs.length; i++) if (typeof xs[i] === 'object' && xs[i].model) return xs[i];
    return p.model ? p : null;
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
