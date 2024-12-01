import { useTranslation } from '@pancakeswap/localization'
import {
  BinanceChainIcon,
  Button,
  ButtonProps,
  CoinbaseWalletIcon,
  Flex,
  MetamaskIcon,
  OperaIcon,
  TokenPocketIcon,
  TooltipOptions,
  TrustWalletIcon,
  useTooltip,
} from '@pancakeswap/uikit'
import { Address } from 'viem'
import { watchAsset } from 'viem/actions'
import { useAccount, useWalletClient } from 'wagmi'
import { canRegisterToken } from '../../utils/wallet'
import { BAD_SRCS } from '../Logo/constants'

export enum AddToWalletTextOptions {
  NO_TEXT,
  TEXT,
  TEXT_WITH_ASSET,
}

export interface AddToWalletButtonProps {
  tokenAddress?: string
  tokenSymbol?: string
  tokenDecimals?: number
  tokenLogo?: string
  textOptions?: AddToWalletTextOptions
  marginTextBetweenLogo?: string
  tooltipPlacement?: TooltipOptions['placement']
}

const Icons = {
  // TODO: Brave
  Binance: BinanceChainIcon,
  'Coinbase Wallet': CoinbaseWalletIcon,
  Opera: OperaIcon,
  TokenPocket: TokenPocketIcon,
  'Trust Wallet': TrustWalletIcon,
  MetaMask: MetamaskIcon,
}

const getWalletText = (textOptions: AddToWalletTextOptions, tokenSymbol: string | undefined, t: any) => {
  return (
    textOptions !== AddToWalletTextOptions.NO_TEXT &&
    (textOptions === AddToWalletTextOptions.TEXT
      ? t('Add to Wallet')
      : t('Add %asset% to Wallet', { asset: tokenSymbol }))
  )
}

const getWalletIcon = (marginTextBetweenLogo: string, name?: string) => {
  const iconProps = {
    width: '16px',
    ...(marginTextBetweenLogo && { ml: marginTextBetweenLogo }),
  }
  if (name && Icons[name]) {
    const Icon = Icons[name]
    return <Icon {...iconProps} />
  }
  if (window?.ethereum?.isTrust) {
    return <TrustWalletIcon {...iconProps} />
  }
  if (window?.ethereum?.isCoinbaseWallet) {
    return <CoinbaseWalletIcon {...iconProps} />
  }
  if (window?.ethereum?.isTokenPocket) {
    return <TokenPocketIcon {...iconProps} />
  }
  if (window?.ethereum?.isMetaMask) {
    return <MetamaskIcon {...iconProps} />
  }
  return <MetamaskIcon {...iconProps} />
}

const AddToWalletButton: React.FC<AddToWalletButtonProps & ButtonProps> = ({
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenLogo,
  textOptions = AddToWalletTextOptions.NO_TEXT,
  marginTextBetweenLogo = '0px',
  tooltipPlacement = 'auto',
  ml,
  mr,
  ...props
}) => {
  const { t } = useTranslation()
  const { connector, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const isCanRegisterToken = canRegisterToken()

  const { targetRef, tooltipVisible, tooltip } = useTooltip(t('Add to your wallet'), {
    placement: tooltipPlacement,
  })

  if (!walletClient) return null
  if (connector && connector.name === 'Binance') return null
  if (!(connector && isConnected)) return null
  if (!isCanRegisterToken) return null

  return (
    <>
      <Flex alignItems="center" justifyContent="center" ref={targetRef} ml={ml} mr={mr}>
        <Button
          {...props}
          title={t('Add to your wallet')}
          onClick={() => {
            const image = tokenLogo ? (BAD_SRCS[tokenLogo] ? undefined : tokenLogo) : undefined
            if (!tokenAddress || !tokenSymbol || !tokenDecimals) return
            watchAsset(walletClient, {
              // TODO: Add more types
              type: 'ERC20',
              options: {
                address: tokenAddress as Address,
                symbol: tokenSymbol,
                image,
                decimals: tokenDecimals,
              },
            })
          }}
        >
          {getWalletText(textOptions, tokenSymbol, t)}
          {getWalletIcon(marginTextBetweenLogo, connector?.name)}
        </Button>
      </Flex>
      {tooltipVisible && tooltip}
    </>
  )
}

export default AddToWalletButton