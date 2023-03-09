interface Props{
  [key: string]: string;
}

/**
 * Description: 프로젝트 슬라이드 Interface
 * Date: 2023.01.12
 * Author: Kim Gyeong Seok
 */
export interface ProjectSlideInterfaceProps extends Object {
  id: string;
  sequence: number;
  name: string;
  avatar: string;
  background: string;
  voice: string;
  thumbnail: string | null;
  createdAt: string | null;
}

/**
 * Description: 사용자 Interface
 * Date: 2023.03.08
 * Author: Kim Gyeong Seok
 */
export interface UserProps extends Object {
  id?: string;
  password?: string;
  name?: string;
  accessToken?: string;
}

/**
 * Description: 아바타 및 목소리를 이용하여 생성한 프로젝트 Interface
 * Date: 2023.03.08
 * Author: Kim Gyeong Seok
 */
export interface ProjectProps {
  projectName: string;
  projectId: number | string;
  uuid: string;
  avatar: AvatarProps;
  voice: VoiceProps;
  scriptList : Array<object>
  thumbnail: null | string;
}

/**
 * Description: 아바타 Interface
 * Date: 2023.03.08
 * Author: Kim Gyeong Seok
 */
export interface AvatarProps extends Object{
  name: string;
  model: string;
  imageFileUrl: string;
}

/**
 * Description: 목소리 Interface
 * Date: 2023.03.08
 * Author: Kim Gyeong Seok
 */
export interface VoiceProps extends Object{
  name: string;
  model: string;
  imageFileUrl: string;
}