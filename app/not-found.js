import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section page-product">
      <div className="container page-product__inner">
        <p className="page-error" role="alert">
          Page not found.
        </p>
        <Link href="/" className="btn btn--primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
