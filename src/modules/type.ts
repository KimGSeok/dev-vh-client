/**
 * 2023.01.12
 * 프로젝트 슬라이드 Interface
 */
export interface ProjectSlideInterfaceProps {
  id: string;
  sequence: number;
  name: string;
  avatar: string;
  background: string;
  voice: string;
  thumbnail: string | null;
  createdAt: string | null;
}