import { BASE_ICON, ICX_ICON } from "@/constants/images";
import { useBrackets } from "@/context/bracket.context";
import { useTournamentContext } from "@/context/tournament.context";
import {
  connectWallet,
  updateWalletConnectedType,
} from "@/features/wallet/walletThunks";
import { IChainType } from "@/models/chains.model";
import { IEvmWalletTypes, IIconWalletType } from "@/models/wallet.model";
import { paymentFactory } from "@/services/contractService/paymentService/paymentFactory";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

import ConnectionFlow from "../connection/connectionFlow.compoent";

import { WalletConnectingModal } from "./connectingWallet.component";

interface IWalleltConnetProps {
  setOpenRegModal(x: boolean): any;
  setOpenConnectModal(x: boolean): any;
  setOpenBaseWalletModal?(x: boolean): any;
  setOpenTeamChooseModal?(x: boolean): any;
  setOpenConnectingModal?(x: boolean): any;
  setConnectingModalProps?(x: any): any;
}

export const WalletConnectModal = ({
  setOpenRegModal,
  setOpenConnectModal,
  setOpenBaseWalletModal,
  setOpenTeamChooseModal,
  setOpenConnectingModal,
  setConnectingModalProps,
}: IWalleltConnetProps) => {
  const dispatch = useAppDispatch();
  const { gameTier } = useBrackets();
  const { isWalletConnected, walletConnecting, iconAddress } = useAppSelector(
    (state: RootState) => state.wallet
  );
  const { activeTournament, fetchTeamInfo, fetchPlayerProfile } =
    useTournamentContext();

  const { tournamentPlayers, listOfJoinedAddress } = useBrackets();

  console.log(tournamentPlayers, ":tournamentPlayers");

  const handleWalletConnect = async (walletType?: IIconWalletType) => {
    try {
      setConnectingModalProps({
        walletType: "HANA",
        connectingChain: "ICON",
      });
      setOpenConnectingModal(true);
      const res = await dispatch(connectWallet(walletType));
      console.log(res, ":res");
      if (res.meta.requestStatus === "rejected") {
        setOpenConnectingModal(false);

        // @ts-ignore
        throw res.error?.message;
      } else {
        // @ts-ignore
        // await fetchPlayerProfile(res.payload?.iconAddress);
        setConnectingModalProps({
          walletType: "",
          connectingChain: "",
        });
        const tournamentPaymentService = paymentFactory("ICON" as IChainType);

        const hasUerPaid: boolean = await tournamentPaymentService.hasPaid(
          activeTournament?.tournamentId?.toString(),
          // @ts-ignore
          res.payload?.iconAddress
        );

        if (hasUerPaid) {
          console.log("userHasPaid");
          setOpenConnectModal(false);
          setOpenConnectingModal(false);
          await fetchTeamInfo();
          // @ts-ignore
          await fetchPlayerProfile(res.payload?.iconAddress);

          // setOpenTeamChooseModal(true);
        } else if (tournamentPlayers.icon === 16) {
          await fetchTeamInfo();
          // @ts-ignore
          await fetchPlayerProfile(res.payload?.iconAddress);
          setOpenConnectingModal(false);
          setOpenConnectModal(false);
        } else {
          setOpenConnectingModal(false);
          setOpenRegModal(false); //true
          setOpenConnectModal(false);
        }
      }
    } catch (error) {
      setOpenConnectingModal(false);
      setConnectingModalProps({
        walletType: "",
        connectingChain: "",
      });
    }
  };
  return (
    <div className="walletConnectContainer">
      <div className="flex items-center justify-center my-5">
        <div className="modalHeaderTitle">
          <h3>Choose your network</h3>
          <p className="!w-[400px] !text-[#ACACAC] text-[14px]">
            Choose the network you want to join Multi-chain Tournament with
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center mb-3">
        <ConnectionFlow
          chooseNetwork={{ current: true, completed: false }}
          connectWallet={{ current: false, completed: false }}
          address={{ current: false, completed: false }}
          learnMore={{ current: false, completed: false }}
        />
      </div>
      <div className="walletConnectBody">
        <div className="flex items-center gap-[100px] justify-center">
          <div className="flex flex-col items-end justify-end">
            <div>
              <div
                onClick={() => {
                  dispatch(updateWalletConnectedType(IIconWalletType.hana));
                  handleWalletConnect(IIconWalletType.hana);
                }}
                className="walletBorder"
              >
                <img src={ICX_ICON} alt="" />
              </div>
              <p className="base-title-text">ICON</p>
            </div>
            <div className="text-white flex flex-col justify-end items-end w-[270px] text-end">
              <h1 className="w-[200px] text-[#C2C2C2]">
                Requirements for ICON
              </h1>
              <p className="text-[#A9A9A9] text-[14px]">
                ICX in your wallet <br />
                At least one GangstaBet NFT <br />
                Weapons, Items or Lootcrates (optional){" "}
              </p>
              <p className="mt-[10px] text-[#B0B0B0] underline cursor-pointer text-[14px]">
                Learn More
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <div>
              <div
                onClick={() => {
                  setOpenConnectModal(false);
                  setOpenBaseWalletModal(true);
                }}
                className="walletBorder"
              >
                <img src={BASE_ICON} alt="" />
              </div>
              <p className="base-title-text">BASE</p>
            </div>

            <div className="text-white flex flex-col justify-start items-start w-[270px] text-start">
              <h1 className="w-[200px] text-[#C2C2C2]">
                Requirements for BASE
              </h1>
              <p className="text-[#A9A9A9] text-[14px]">
                {gameTier === "LOW" ? "$15" : gameTier === "HIGH" ? "$25" : ""}{" "}
                USDC on BASE Network <br />
                A Wallet on ICON Network (preferably, HANA) <br />
                Weapons, Items or LootCrates (optional)
              </p>
              <p className="mt-[10px] text-[#B0B0B0] underline cursor-pointer text-[14px]">
                Learn More
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
