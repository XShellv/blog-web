import MyScript from "module/myScript";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/static/favicon.png" />
          {/* <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/vditor/dist/index.css"
          /> */}
          {typeof window === "undefined" && (
            <style
              id="holderStyle"
              dangerouslySetInnerHTML={{
                __html: `
                *, *::before, *::after {
                  transition: none !important;
                }
                `,
              }}
            />
          )}
        </Head>
        <body>
          <Main />
          <MyScript>
            {function () {
              var hm = document.createElement("script");
              hm.src =
                "https://hm.baidu.com/hm.js?49893c6a2f3f90bddbd2e7691f051255";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            }}
          </MyScript>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
