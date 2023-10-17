import './index.css';
import { useEffect } from 'react';

async function loadFrontPageContent() {
  const res = await fetch('/data/showcase/js-01.json');
  const data = await res.json();
  console.log('@@ data', data);
}

export default function LandingPage() {
  useEffect(() => {
    loadFrontPageContent();
  }, []);
  return <>New landing</>;
}
