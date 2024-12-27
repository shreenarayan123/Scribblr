import { AtomEffect, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user-interactions",
  storage: localStorage,
});

const localStorageEffect =
  (key: string): AtomEffect<any> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const followAtomFamily = atomFamily<boolean, string>({
  key: "followAtomFamily",
  default: (followeeId: string) => false,
  effects_UNSTABLE: (followeeId: string) => [
    localStorageEffect(`follow_${followeeId}`),
  ],
});

export const bookmarkAtomFamily = atomFamily({
  key: "bookmarkAtomFamily",
  default: (blogId: string) => false,
  effects_UNSTABLE: (blogId: string) => [
    localStorageEffect(`bookmark_${blogId}`),
  ],
});
export const clapAtomFamily = atomFamily({
  key: "clapAtomFamily",
  default: (blogId: string) => false,
  effects_UNSTABLE: (blogId: string) => [localStorageEffect(`clap_${blogId}`)],
});
