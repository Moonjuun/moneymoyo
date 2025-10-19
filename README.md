# 💰 머니모여 (MoenyMoyo)

> 돈 버는 즐거운 습관, 오늘도 쌓이는 머니

미션 완료와 미니게임을 통해 포인트와 응모권을 모으고, 경품에 응모할 수 있는 리워드 앱입니다.

---

## 📱 프로젝트 개요

### 주요 기능
- ✅ 소셜 로그인 (Google, Naver, Apple)
- 🎯 다양한 미션 시스템 (출석, 광고, 친구 초대)
- 🎮 6종의 미니게임 (맞춤법, 숫자, 색감, 국기, 반응속도, 데시벨)
- 🎁 경품 응모 시스템 (천장 시스템 포함)
- 💬 커뮤니티 (게시판, 댓글)
- 💳 포인트 출금 및 교환

### 기술 스택
- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **UI**: React Native 0.81
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: React Context API
- **Navigation**: React Navigation v7
- **Storage**: Expo SecureStore

---

## 🚀 시작하기

### 필수 요구사항
- Node.js 20.x 이상
- npm 또는 yarn
- Expo CLI
- iOS: Xcode 26 (macOS)
- Android: Android Studio

### 설치 및 실행
```bash
# 저장소 클론
git clone https://github.com/your-username/moenymoyo.git
cd moenymoyo

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 Supabase 정보 입력

# 개발 서버 실행
npx expo start

# iOS 실행
npx expo start --ios

# Android 실행
npx expo start --android
```

### 환경 변수 설정

`.env` 파일에 다음 정보를 입력하세요:
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📁 프로젝트 구조
```
moenymoyo/
├── src/
│   ├── screens/              # 화면 컴포넌트
│   │   ├── splash/          # 스플래시 화면
│   │   ├── auth/            # 인증 (로그인)
│   │   ├── home/            # 홈
│   │   ├── missions/        # 미션 목록
│   │   ├── games/           # 미니게임
│   │   ├── prizes/          # 경품
│   │   ├── community/       # 커뮤니티
│   │   ├── profile/         # 프로필
│   │   └── wallet/          # 지갑/출금
│   │
│   ├── components/           # 재사용 컴포넌트
│   │   ├── common/          # 공통 컴포넌트
│   │   ├── layout/          # 레이아웃
│   │   ├── mission/         # 미션 관련
│   │   ├── game/            # 게임 관련
│   │   ├── prize/           # 경품 관련
│   │   ├── community/       # 커뮤니티 관련
│   │   └── wallet/          # 지갑 관련
│   │
│   ├── navigation/           # 네비게이션
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   │
│   ├── hooks/                # 커스텀 훅
│   │   ├── auth/
│   │   ├── profile/
│   │   ├── missions/
│   │   ├── prizes/
│   │   ├── community/
│   │   └── wallet/
│   │
│   ├── contexts/             # React Context
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── services/             # API 서비스 레이어
│   │   └── supabase/
│   │       ├── auth/
│   │       ├── profiles/
│   │       ├── missions/
│   │       ├── prizes/
│   │       ├── community/
│   │       └── wallet/
│   │
│   ├── lib/                  # 라이브러리 설정
│   │   ├── supabase.ts
│   │   └── database.types.ts
│   │
│   ├── utils/                # 유틸리티 함수
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── storage.ts
│   │
│   ├── constants/            # 상수 (기능별 분리)
│   │   ├── theme/           # 테마 (colors, fonts, spacing)
│   │   ├── api/             # API 설정
│   │   ├── game/            # 게임 설정
│   │   ├── mission/         # 미션 설정
│   │   ├── prize/           # 경품 설정
│   │   └── community/       # 커뮤니티 설정
│   │
│   ├── types/                # TypeScript 타입 (기능별 분리)
│   │   ├── auth/
│   │   ├── profile/
│   │   ├── mission/
│   │   ├── prize/
│   │   ├── community/
│   │   ├── wallet/
│   │   ├── game/
│   │   ├── navigation/
│   │   └── common/
│   │
│   └── assets/               # 리소스
│       ├── images/
│       ├── fonts/
│       └── sounds/
│
├── .env                      # 환경 변수 (gitignore)
├── .env.example              # 환경 변수 예제
├── app.json                  # Expo 설정
├── package.json
└── tsconfig.json
```

---

## 🎨 디자인 가이드

### 컬러 시스템
```typescript
// Primary (메인 컬러)
Colors.primary.main    // #6366F1 - 주요 버튼, 강조
Colors.primary.light   // #818CF8 - 배경, 비활성
Colors.primary.dark    // #4F46E5 - 호버, 액티브

// Secondary (보조 컬러)
Colors.secondary.main  // #EC4899 - 응모권, 강조
Colors.accent.main     // #F59E0B - 포인트, 경고

// Status (상태 컬러)
Colors.success         // #10B981 - 성공
Colors.error           // #EF4444 - 에러
Colors.warning         // #F59E0B - 경고
Colors.info            // #3B82F6 - 정보
```

### 타이포그래피
```typescript
// Font Sizes
Fonts.size.xs      // 12px - 캡션
Fonts.size.sm      // 14px - 보조 텍스트
Fonts.size.base    // 16px - 본문
Fonts.size.lg      // 18px - 서브 타이틀
Fonts.size.xl      // 20px - 타이틀
Fonts.size['2xl']  // 24px - 큰 타이틀
Fonts.size['3xl']  // 30px - 헤더
Fonts.size['4xl']  // 36px - 대형 헤더

// Font Weights
Fonts.weight.regular   // 400
Fonts.weight.medium    // 500
Fonts.weight.semiBold  // 600
Fonts.weight.bold      // 700
```

### 간격 (Spacing)
```typescript
Spacing.xs      // 4px
Spacing.sm      // 8px
Spacing.md      // 12px
Spacing.base    // 16px
Spacing.lg      // 20px
Spacing.xl      // 24px
Spacing['2xl']  // 32px
Spacing['3xl']  // 40px
Spacing['4xl']  // 48px
Spacing['5xl']  // 64px
```

### Border Radius
```typescript
BorderRadius.sm    // 4px
BorderRadius.base  // 8px
BorderRadius.md    // 12px
BorderRadius.lg    // 16px
BorderRadius.xl    // 20px
BorderRadius.full  // 9999px (완전 둥글게)
```

---

## 🏗️ 아키텍처 패턴

### 1. 컴포넌트 분리 원칙

#### Screens (화면)
- 페이지 단위의 최상위 컴포넌트
- 네비게이션과 직접 연결
- 비즈니스 로직 최소화 (hooks 활용)
```typescript
// ✅ Good
function HomeScreen() {
  const { missions, loading } = useMissions();
  return <MissionList missions={missions} loading={loading} />;
}

// ❌ Bad - 화면에서 직접 API 호출
function HomeScreen() {
  const [missions, setMissions] = useState([]);
  useEffect(() => {
    supabase.from('missions').select('*').then(...);
  }, []);
}
```

#### Components (컴포넌트)
- 재사용 가능한 UI 조각
- Props로 데이터 받기
- 비즈니스 로직 없음 (순수 UI)
```typescript
// ✅ Good - 순수 UI 컴포넌트
interface MissionCardProps {
  mission: Mission;
  onPress: () => void;
}

function MissionCard({ mission, onPress }: MissionCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{mission.title}</Text>
    </TouchableOpacity>
  );
}
```

### 2. Custom Hooks 패턴

비즈니스 로직을 hooks로 분리합니다.
```typescript
// hooks/missions/useMissions.ts
export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    // API 호출 로직
  };

  return { missions, loading, refetch: fetchMissions };
}
```

### 3. Service Layer 패턴

API 호출을 별도 레이어로 분리합니다.
```typescript
// services/supabase/missions/missionService.ts
export const missionService = {
  async getAll() {
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .eq('is_active', true);
    
    if (error) throw error;
    return data;
  },

  async complete(missionId: string, resultData?: any) {
    // 미션 완료 로직
  },
};
```

### 4. 타입 정의 규칙

기능별로 타입을 분리합니다.
```typescript
// types/mission/index.ts
import { Database } from '@/lib/database.types';

// Supabase 타입 재사용
export type Mission = Database['public']['Tables']['missions']['Row'];

// 확장 타입
export interface MissionWithStatus extends Mission {
  status: 'available' | 'completed' | 'locked';
  canComplete: boolean;
}
```

---

## 📝 코딩 컨벤션

### 네이밍 규칙
```typescript
// 컴포넌트: PascalCase
function MissionCard() {}

// 함수/변수: camelCase
const handlePress = () => {};
const missionList = [];

// 상수: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;

// 타입/인터페이스: PascalCase
interface MissionCardProps {}
type MissionStatus = 'available' | 'completed';

// 파일명
// - 컴포넌트: PascalCase (MissionCard.tsx)
// - 유틸/훅: camelCase (useMissions.ts)
```

### Import 순서
```typescript
// 1. React 및 React Native
import React, { useState } from 'react';
import { View, Text } from 'react-native';

// 2. 외부 라이브러리
import { useNavigation } from '@react-navigation/native';

// 3. 내부 컴포넌트
import MissionCard from '@/components/mission/MissionCard';

// 4. Hooks
import { useMissions } from '@/hooks/missions/useMissions';

// 5. Utils, Constants, Types
import { Colors } from '@/constants/theme/colors';
import { Mission } from '@/types/mission';

// 6. 스타일
import styles from './styles';
```

### 컴포넌트 구조
```typescript
// 1. Imports
import React from 'react';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export default function MyComponent({ title }: Props) {
  // 3-1. Hooks
  const [state, setState] = useState('');
  
  // 3-2. Handlers
  const handlePress = () => {
    // ...
  };
  
  // 3-3. Render
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

// 4. Styles
const styles = StyleSheet.create({
  // ...
});
```

---

## 🔒 보안 가이드

### 환경 변수
- `.env` 파일은 **절대 커밋하지 않음**
- 민감한 정보는 `expo-secure-store` 사용
- API 키는 `EXPO_PUBLIC_` 접두사 사용

### RLS (Row Level Security)
- Supabase의 RLS 정책을 엄격히 설정
- 사용자는 자신의 데이터만 접근 가능

---

## 🧪 테스트
```bash
# Unit Tests (예정)
npm run test

# E2E Tests (예정)
npm run test:e2e
```

---

## 🚢 배포
```bash
# Development Build
eas build --profile development --platform all

# Production Build
eas build --profile production --platform all

# Submit to Stores
eas submit --platform ios
eas submit --platform android
```

---

## 📚 참고 문서

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Supabase 문서](https://supabase.com/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)


### Commit Message Convention
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 업무, 패키지 매니저 설정 등
```

---

## 📄 라이센스

MIT License

---
