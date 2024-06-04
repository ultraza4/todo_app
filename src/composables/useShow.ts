import { type Ref, ref } from 'vue'

interface UseShowReturn {
  isShow: Ref<boolean>;
  toggleShow: () => void;
}

type CancelFunction = () => void;

const useShow = (cancel: CancelFunction = () => {}): UseShowReturn => {
  const isShow = ref(false);
  const toggleShow = () => {
    isShow.value = !isShow.value;
    if (!isShow.value) {
      cancel();
    }
  };
  return { isShow, toggleShow };
};

export default useShow;
