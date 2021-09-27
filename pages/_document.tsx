import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { ReactElement } from 'react';
import { ServerStyleSheet } from 'styled-components';

interface IBaseDocumentProps extends DocumentInitialProps {
  styleTags: Array<ReactElement>;
}

class BaseDocument extends Document {
  static async getInitialProps({ renderPage }: DocumentContext): Promise<IBaseDocumentProps> {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = await renderPage(
      (App) =>
        function SSRStyled(props) {
          return sheet.collectStyles(<App {...props} />);
        },
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render(): ReactElement {
    const { styleTags } = this.props as unknown as IBaseDocumentProps;
    return (
      <html>
        <Head>{styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default BaseDocument;
