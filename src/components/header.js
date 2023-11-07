'use client';
import Img from 'next/image';
import logotype from '../../public/images/svg/NT-Logotype.png';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { info } from '../../info';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [openBurger, setOpenBurger] = useState(false);
  const [ww, setWindowWidth] = useState(undefined);
  const pathName = usePathname();

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (pathName === '/survey') {
    return (
      <div className="fixed z-[9999] flex justify-center right-0 left-0 p-4 bg-black border-b border-white">
        <Link href="/">
          <div id="logo" className="flex items-center w-[20rem] h-12 relative top-0 invert">
            <Img
              src={logotype}
              fill={true}
              style={{objectFit: 'contain'}}
            />
          </div>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:flex fixed h-screen z-[999]">
        <div className="fixed flex flex-col h-full flex-grow w-[20rem] left-0 p-4">
          <Link href="/">
            <div id="logo" className="flex items-center w-full h-12 relative top-0">
              <Img
                src={logotype}
                fill={true}
                style={{objectFit: 'contain'}}
              />
            </div>
          </Link>
          <div
            id="headerFoot"
            className="mt-auto"
          >
            <p className="-ft-3">English // Spanish</p>
          </div>
        </div>
        <div className="fixed flex flex-col h-full flex-grow w-[20rem] right-0 p-4 items-end space-y-2">
          <a href={`https://instagram.com/${info.social.instagram}`} className="-ft-3" target="_blank">Instagram</a>
          <a href={`https://facebook.com/${info.social.facebook}`} className="-ft-3" target="_blank">Facebook</a>
          <a href={`https://wa.me/${info.whatsapp.value}`} className="-ft-3" target="_blank">WhatsApp</a>
        </div>
      </div>

      <div className="fixed top-0 inset-x-0 flex lg:hidden justify-between bg-white border-b p-4 z-[9999]">
        <Link href="/">
          <div id="logo" className="relative flex justify-start w-[16rem] pt-[4rem] top-0">
            <Img
              src={logotype}
              fill={true}
              style={{objectFit: 'contain', filter: 'brightness(0)'}}
            />
          </div>
        </Link>
        {/*<div className="w-[4rem] h-[4rem] cursor-pointer" onClick={() => setOpenBurger(!openBurger)}>*/}
        {/*  <a*/}
        {/*    className={`burger_box w-10 h-8 ${openBurger && 'active'}`}*/}
        {/*  >*/}
        {/*    <span className="burger_ico"/>*/}
        {/*  </a>*/}
        {/*</div>*/}
      </div>
    </>
  );

}