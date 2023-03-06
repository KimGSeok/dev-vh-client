/**
 * Description: Atom States Storage
 * Date: 2023.03.06
 * Author: Kim Gyeong Seok
 */
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const authState = atom({
  key: 'auth',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

export { authState }