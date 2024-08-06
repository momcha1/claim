import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

const HANA_KEYWORD = "hana";

export const getHanaSnowAddress = async () => {
  const extensions = await web3Enable("ICON-BET-CLAIM");
  console.log(extensions, "ext");

  const isHana =
    extensions.filter((e) => e.name.toLocaleLowerCase().includes(HANA_KEYWORD))
      .length > 0;

  if (extensions.length === 0 || !isHana) {
    // no extension installed, or the user did not accept the authorization
    // in this case we should inform the use and give a link to the extension
    return null;
  } else {
    // we are now informed that the user has at least one extension and that we
    // will be able to show and use accounts

    const allAccounts = await web3Accounts();
    console.log("All accounts fetched", allAccounts);
    const accountsOfInterest = allAccounts.filter((acc) =>
      acc.meta.source.includes(HANA_KEYWORD)
    );

    return accountsOfInterest.length > 0 ? accountsOfInterest : null;
  }
};
