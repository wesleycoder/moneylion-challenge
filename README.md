# MoneyLion Challenge

[![lighthouse performances](https://flat.badgen.net/https/moneylion.guima.dev/api/badges/performance?cache=300&icon=data%3Aimage%2Fsvg%2Bxml%2C%3Csvg%20fill%3D%22%2523F44B21%22%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3ELighthouse%3C%2Ftitle%3E%3Cpath%20d%3D%22M12%200l5.5%203.5v5H20v3h-2.25l2%2012.5H4.25l2-12.5H4v-3h2.5V3.53zm2.94%2013.25l-6.22%202.26L8%2020.04l7.5-2.75zM12%203.56L9.5%205.17V8.5h5V5.15Z%22%2F%3E%3C%2Fsvg%3E)](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fmoneylion.guima.dev%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo)
[![lighthouse accessibility](https://flat.badgen.net/https/moneylion.guima.dev/api/badges/accessibility?cache=300&icon=data%3Aimage%2Fsvg%2Bxml%2C%3Csvg%20fill%3D%22%2523F44B21%22%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3ELighthouse%3C%2Ftitle%3E%3Cpath%20d%3D%22M12%200l5.5%203.5v5H20v3h-2.25l2%2012.5H4.25l2-12.5H4v-3h2.5V3.53zm2.94%2013.25l-6.22%202.26L8%2020.04l7.5-2.75zM12%203.56L9.5%205.17V8.5h5V5.15Z%22%2F%3E%3C%2Fsvg%3E)](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fmoneylion.guima.dev%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo)
[![lighthouse best practices](https://flat.badgen.net/https/moneylion.guima.dev/api/badges/best-practices?cache=300&icon=data%3Aimage%2Fsvg%2Bxml%2C%3Csvg%20fill%3D%22%2523F44B21%22%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3ELighthouse%3C%2Ftitle%3E%3Cpath%20d%3D%22M12%200l5.5%203.5v5H20v3h-2.25l2%2012.5H4.25l2-12.5H4v-3h2.5V3.53zm2.94%2013.25l-6.22%202.26L8%2020.04l7.5-2.75zM12%203.56L9.5%205.17V8.5h5V5.15Z%22%2F%3E%3C%2Fsvg%3E)](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fmoneylion.guima.dev%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo)
[![lighthouse seo](https://flat.badgen.net/https/moneylion.guima.dev/api/badges/seo?cache=300&icon=data%3Aimage%2Fsvg%2Bxml%2C%3Csvg%20fill%3D%22%2523F44B21%22%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3ELighthouse%3C%2Ftitle%3E%3Cpath%20d%3D%22M12%200l5.5%203.5v5H20v3h-2.25l2%2012.5H4.25l2-12.5H4v-3h2.5V3.53zm2.94%2013.25l-6.22%202.26L8%2020.04l7.5-2.75zM12%203.56L9.5%205.17V8.5h5V5.15Z%22%2F%3E%3C%2Fsvg%3E)](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fmoneylion.guima.dev%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo)

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with
`create-t3-app`.

## Hosted on

- [moneylion.guima.dev](https://moneylion.guima.dev)

## The stack

- [Next.js](https://nextjs.org) as the base framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [TypeScript](https://www.typescriptlang.org) for tying everything together and
  bring type safety
- [Biome.js](https://biomejs.dev) for managing linting and formatting
- [Bun](https://bun.sh) for managing the project's dependencies

## Learn more

This project was carefully documented using the
[Code Tour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)
extension for VSCode, I highly recomend using it to learn more about the
decisions made in the project.

For more information about this handy extension, check their
[documentation](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour#getting-started)
on how to setup and use it.
![Code Tour](https://user-images.githubusercontent.com/116461/76151694-7b531b80-606c-11ea-96a6-0655eb6ab4e6.gif)

## How do I run this project?

First add the required environment variables to the `.env` file in the `root` of
the project:

```toml
FEED_URL="https://stoplight.io/mocks/engine/fullstack-spec/52502230/content"
```

Then, run the following commands:

```sh
# First, you need to install the dependencies:
bun install
# Then, you can run the development server:
bun dev
# That's it! The project is running at http://localhost:3000
```

## How do I deploy this?

Follow one of the deployment guides for
[Vercel](https://create.t3.gg/en/deployment/vercel),
[Netlify](https://create.t3.gg/en/deployment/netlify) and
[Docker](https://create.t3.gg/en/deployment/docker) for more information.
