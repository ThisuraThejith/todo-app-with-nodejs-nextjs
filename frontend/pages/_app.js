import '../styles/globals.css'
import cookies from 'next-cookies'
import redirectTo from '../components/redirectTo.js'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};
    const c = cookies(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    //If the authtoken is not found
    if(typeof c.authtoken == 'undefined') {
    //Don't do anything if we are on a page that doesn't require credentials
    if(ctx.pathname == "/signin" || ctx.pathname == "/signup") return {pageProps};
    //If we are on any other page, redirect to the signin page
    else {
      redirectTo('/signin', { res: ctx.res, status: 301 })
    }
  }

    return {pageProps};
}

export default MyApp
