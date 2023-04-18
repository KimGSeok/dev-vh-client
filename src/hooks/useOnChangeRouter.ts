import { useRouter } from "next/router";
import { useEffect } from "react";

const useOnChangeRouterHandler = (handleState?: any) => {

  const router = useRouter();
  useEffect(() => {

    if(!handleState){
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        return (e || window.event).returnValue = '?';
      }
  
      const handleBeforeChangeRoute = (url: string) => {
        if (router.pathname !== url && !confirm('페이지를 떠나시겠습니까?\n현재 작성중인 데이터는 저장되지 않습니다.')) {
          router.events.emit('routeChangeError');
          if (router.asPath !== window.location.pathname) window.history.pushState("", "", router.asPath);
          throw 'Abort route change. Please ignore this error.';
        }
      }
  
      window.addEventListener("beforeunload", handleBeforeUnload, { capture: true });
      router.events.on('routeChangeStart', handleBeforeChangeRoute);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload, { capture: true });
        router.events.off('routeChangeStart', handleBeforeChangeRoute);
      };
    }
  }, [router.events, handleState])
}

export default useOnChangeRouterHandler;