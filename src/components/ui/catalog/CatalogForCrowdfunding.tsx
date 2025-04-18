'use client';

import Link from 'next/link';
import { ICatalog } from './catalog.interface';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './components/style/CatalogForCrowdfunding.module.css';
import { CrowdfundingProducts } from '@/app/(root)/explorer/components/CrowdfundingProducts';

export function CatalogForCrowdfunding({
  title,
  description,
  linkTitle,
  link,
  products
}: ICatalog) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 400;
      if (direction === 'left') {
        scrollContainer.current.scrollLeft -= scrollAmount;
      } else {
        scrollContainer.current.scrollLeft += scrollAmount;
      }
    }
  };

  const updateCurrentIndex = () => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      const productWidth = container.scrollWidth / products.length;
      const newIndex = Math.round(container.scrollLeft / productWidth);
      setCurrentProductIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = scrollContainer.current;
    if (container) {
      container.addEventListener('scroll', updateCurrentIndex);
      return () => container.removeEventListener('scroll', updateCurrentIndex);
    }
  }, []);

  return (
    <div className={styles.productWrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>{title}</h1>
          {link && linkTitle && (
            <Link href={link}>
              <button className={styles.button}>{linkTitle}</button>
            </Link>
          )}
        </div>

        <div className={styles.arrowContainer}>
          <div className={styles.arrow} onClick={() => scroll('left')}>
            <Image src="/images/LeftArrow.svg" alt="Scroll Left" width={6} height={10} />
          </div>
          <div className={styles.arrow} onClick={() => scroll('right')}>
            <Image src="/images/rightArrow.svg" alt="Scroll Right" width={6} height={10} />
          </div>
        </div>
      </div>

      <div className={styles.productContainer} ref={scrollContainer}>
        {products.map((product, index) => (
          <div key={product.id} className={styles.productCard}>
            <CrowdfundingProducts product={product} index={index} />
          </div>
        ))}
      </div>

      <div className={styles.paginationDots}>
        {products.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${currentProductIndex === index ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
