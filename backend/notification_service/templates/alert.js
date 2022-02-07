module.exports = function template(body, source) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      *,
      *::after,
      *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: sans-serif;
        background: #eee;
      }
      .container {
        width: 100%;
        max-width: 60rem;
        display: block;
        margin: 0 auto;
        padding: 0 2rem;
      }
      .container-main {
        width: 100%;
        max-width: 60rem;
        display: block;
        margin: 0 auto;
      }

      /* Header */
      .header {
        width: 100%;
        height: 25vh;
        background-color: rgb(127, 195, 250);
      }
      .footer {
        width: 100%;
        height: 25vh;
        background-color: rgb(127, 195, 250);
      }
      .brand {
        width: 100%;
        height: 25vh;
        display: grid;
        place-content: center;
      }
      .logo {
        width: 100%;
      }
      .main {
        background: #fff;
      }
      .content {
        text-align: center;
        padding-bottom: 3rem;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .banner-small {
        display: block;
        margin: 0 auto;
        width: 40%;
        margin: 2.5rem 0;
      }
      .message-text {
        font-size: 1.2rem;
        font-weight: 700;
        color: #111;
        line-height: 1.5rem;
      }
      .link-text {
        font-size: 0.95rem;
        font-weight: 600;
        color: rgb(0, 140, 255);
        cursor: pointer;
      }
      .link-text:hover {
        color: rgb(64, 169, 255);
      }
      .small-text {
        width: 60%;
        font-size: 0.9rem;
        font-weight: 500;
        color: rgb(107, 107, 107);
        line-height: 1.5rem;
      }

      .mt-0 {
        margin: 0.4rem 0;
      }
      .mt-1 {
        margin: 1rem 0;
      }
      .mt-2 {
        margin: 1.5rem 0;
      }
      .mt-3 {
        margin: 2rem 0;
      }

      @media screen and (max-width: 786px) {
        .header {
          width: 100%;
          height: 20vh;
        }
        .footer {
          width: 100%;
          height: 20vh;
        }
        .brand {
          width: 100%;
          height: 20vh;
        }
        .message-text {
          font-size: 1rem;
        }
        .link-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgb(0, 140, 255);
          cursor: pointer;
        }
        .link-text:hover {
          color: rgb(64, 169, 255);
        }
        .small-text {
          width: 90%;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgb(107, 107, 107);
        }

        .mt-0 {
          margin: 0.3rem 0;
        }
        .mt-1 {
          margin: 0.8rem 0;
        }
        .mt-2 {
          margin: 1.2rem 0;
        }
        .mt-3 {
          margin: 1.6rem 0;
        }
      }

      @media screen and (max-width: 586px) {
        .header {
          height: 16vh;
        }
        .footer {
          height: 16vh;
        }
        .brand {
          height: 16vh;
        }
        .content {
          padding-bottom: 1.5rem;
        }
        .message-text {
          font-size: 0.85rem;
        }
        .link-text {
          font-size: 0.9rem;
        }
        .small-text {
          width: 100%;
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }
        .mt-0 {
          margin: 0.2rem 0;
        }
        .mt-1 {
          margin: 0.7rem 0;
        }
        .mt-2 {
          margin: 1rem 0;
        }
        .mt-3 {
          margin: 1.4rem 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="container-main">
      <header class="header">
        <div class="container">
          <div class="brand">
          <a href="${source}">
            <img src="https://test.vaccineledger.com/logo.png" alt="Otp" class="logo" />
            </a>
          </div>
        </div>
      </header>
      <main class="main">
        <div class="container">
          <section class="content">
          <a href="${source}">
            <img src="https://test.vaccineledger.com/alert.png" alt="illustration" class="banner-small" />
            </a>
            <h5 class="message-text">
                ${body}
            </h5>
            <a href="${source}>"<h6 class="link-text mt-2">Click here to Login</h6></a>
            <p class="small-text">
              In case of any queries or if you didn't request this, you can
              ignore this email or let us know at
              <a href="mailto:contactus@statwig.com"<strong>contactus@statwig.com</strong></a>
            </p>
            <h5 class="message-text mt-1">Thanks, Team Statwig</h5>
          </section>
        </div>
      </main>
      <footer class="footer"></footer>
    </div>
  </body>
</html>`;
};
