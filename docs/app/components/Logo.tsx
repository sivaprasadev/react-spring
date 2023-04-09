import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import { styled } from '~/styles/stitches.config'

import { useIsomorphicLayoutEffect } from '~/hooks/useIsomorphicEffect'

interface LogoProps {
  large?: boolean
}

export const Logo = ({ large = false }: LogoProps) => {
  const centerX = 69.560811
  const centerY = 69.604167
  const rMax = 12

  const [{ x, y, cursor }, api] = useSpring(() => ({
    x: centerX + rMax / 2,
    y: centerY + rMax / 2,
    cursor: 'grab',
    config: { tension: 400, friction: 0.5, precision: 0.1 },
  }))

  const bind = useDrag(({ movement: [dX, dY], down }) => {
    const r = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
    if (r > rMax) {
      // Find point along radius with rMax length
      // See: https://math.stackexchange.com/q/1630886
      const t = rMax / r
      dX *= t
      dY *= t
    }

    api.start({
      x: centerX + (down ? dX : 0),
      y: centerY + (down ? dY : 0),
      cursor: down ? 'grabbing' : 'grab',
      immediate: down,
    })
  })

  useIsomorphicLayoutEffect(() => {
    api.start({
      x: centerX,
      y: centerY,
    })
  }, [api])

  return (
    <Svg
      viewBox="0 0 139 139"
      {...bind()}
      style={{
        cursor,
      }}
      large={large}
    >
      <radialGradient
        id="a"
        cx="33.434395%"
        cy="32.389247%"
        gradientTransform="matrix(.57850251 .81411613 -.8156806 .57739294 .405118 -.135316)"
        r="64.015025%"
      >
        <stop offset="0" stopColor="#fff" stopOpacity=".904382" />
        <stop offset="1" stopColor="#ff6d6d" />
      </radialGradient>

      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <circle
            cx="69.375"
            cy="69.375"
            fill="rgba(250,250,250,1)"
            r="69.375"
          />
          <path
            d="m61.7036428 103.869967c-.3008927.15881-.6194455.198001-.9986496.105707-.4018775-.108222-.8277538-.484318-.9722841-.84701-.1293799-.315008-.1195953-1.181203.0670551-1.921261-.9876687-.219493-2.9337433-.69745-3.9047244-.964762-7.0558988-1.9411418-12.464704-4.5951643-15.2553387-7.4393687-1.508588-1.5375472-2.1542079-2.9558802-2.1472586-4.4855131.0071469-1.12903.3484044-2.0538039 1.2161081-3.1647359.7119232-.9113404 2.045448-2.015538 3.5551801-2.9343133-1.8540449-.5007908-4.6084183-1.3431887-6.1116392-1.8770154-2.4907696-.8917586-5.4140783-2.2488303-6.8812937-3.198075-2.5645231-1.6486745-4.1905718-3.4060152-5.1952597-5.5409694-.6188868-1.3103229-.8874499-2.5536308-.8249513-3.7337862.0636396-1.2017016.4685362-2.3436144 1.224064-3.4294645 1.2386666-1.7779976 3.6941033-3.6284425 7.251406-5.4213873.7482035-.3793075 1.9338912-.9174742 2.8287871-1.3060743-2.5140029-1.6986328-4.1550032-3.7990022-4.6665801-5.8647981-.1632088-.6653669-.1815136-2.0029723-.0389941-2.6202779.8655092-3.6733212 5.7903936-7.6955227 14.0458892-11.1300662.6603782-.2758422 2.5667017-1.004827 3.5272709-1.3549174-.0608919-1.09386.1859264-1.7518545 1.1632672-2.7945877.642809-.6703845 1.3184411-1.0437624 2.1335616-1.1885718.3732846-.065077.6413441-.0462878.8376674.0167333.3193766.102522.5328168.3050701.6626057.6523612.1193826.3269996.1134023.5864646-.03319.8897372-.0841619.1741154-.2457237.384154-.5467945.6778251-.2368272.2273808-.3169501.3115259-.3709642.5183883h.0708218c1.5500713-.4762156 5.0561197-1.3149427 7.2934287-1.7444647 8.1854613-1.568253 17.8213468-2.1836861 25.0730136-1.5988431 6.5678606.5259059 13.7619027 2.0235466 16.0708129 3.3136159.694519.3847015 1.24945.9245847 1.542778 1.4611787.223298.424098.262231.5577369.262231 1.2609916 0 .743535-.042188.8488015-.267733 1.265978-.752996 1.3854871-2.8986969 2.3555393-8.0746782 3.1368151-6.620771 1.000634-17.2819542 1.4891912-25.3625648 1.155657-7.955922-.3243459-13.9303866-1.4290105-17.2388958-3.1409596-.3987303-.2068867-.5191853-.35817-.619423-.3377376-.1034878.0198244-.9118426.2936004-1.8024.5920836-4.892672 1.6642911-8.7978036 3.5410863-11.2886198 5.4513418-.6877463.5257114-1.6855832 1.4848608-2.1135828 2.0361852-.3598089.4610143-.7199502 1.1252988-.761431 1.4899389-.0556989.4494819.1774571.9294989.5787791 1.4429911.5062641.6477658 1.2923166 1.3271537 2.3246298 2.0176171.6994737.4649354 2.6763456 1.5247718 3.5150609 1.8778482l1.0851083-.2244216c5.3039081-1.8554085 11.7100386-3.4738732 18.0660096-4.5653072 8.5856741-1.4733617 19.1323175-2.3771349 29.1636756-2.4860364 5.9773353-.0644664 9.4178681.1705882 13.0925741.8861172 2.868855.5582041 5.654542 1.5610256 6.830993 2.4354666.839282.6184014 1.397805 1.3347201 1.684043 2.0934752.301683.7996972.310813 1.6544039.001033 2.5236268-.807113 2.2630077-3.992406 4.310689-9.352937 5.8203372-5.069335 1.4276408-12.0655105 2.4272957-20.5467739 2.8675323-5.063084.2692318-12.4407108.3009178-16.5418665.0765374-10.4718745-.5793489-18.4969645-1.9911311-24.1762189-4.2381955l-.3867357-.154413c-2.5912066.9117207-6.3538391 2.6041591-8.0945044 3.6233087-1.4483786.8530396-2.7214526 1.8245587-3.3225673 2.5706589-.3728222.4605044-.5930697.8869482-.6272915 1.3517279-.0355318.4825715.1234285.9909294.4297934 1.5894215.484194.9334666 1.6212695 2.1824042 2.6584143 2.9425332 3.2003964 2.3424739 9.1446236 4.5740707 16.8699079 6.3741066l1.6736538.3874148 1.0819075-.3693947c7.1451577-2.4595482 16.9866944-4.3563269 26.5013998-5.101289 5.2752798-.4111098 11.2753368-.4617931 15.6618145-.1277766 3.4845223.2647416 6.4619798.7050228 8.997492 1.3252287 2.238589.5529039 3.904846 1.208226 5.058427 1.9840302 1.286107.8649302 1.968566 1.8872456 2.160314 3.0745667.146456.9073907-.060333 1.7734472-.595654 2.5455946-.489429.7059527-1.266686 1.3373756-2.318991 1.8284859-3.060698 1.4173442-8.6501499 2.3053936-17.3615124 2.7133792-2.1708829.0961981-9.5959335.0962634-11.8939992.000008-9.6047154-.4228272-18.6813601-1.4739261-27.0043095-3.1204964l-1.5745014-.3129784-.5395024.2342869c-1.5643079.6824009-3.2331467 1.6174679-4.3042504 2.4114059-.6264348.4648437-1.3464031 1.2104334-1.558987 1.6550874-.1141795.2327426-.1247416.2787903-.1097658.5117759.0293097.4132344.192096.6960948.5898471 1.2003715 1.7257707 2.212608 6.2624618 4.5977634 11.9647267 6.3778762 2.1724113.6768861 4.5186393 1.2714293 6.8836607 1.7459217l1.1444003.2299881c2.2311707-.9365661 4.9237048-1.2956465 9.431866-1.295646 5.1832243.0064581 10.8537608.7311793 12.6086946 1.1468582 2.0497437.4855084 3.4982518 1.4626379 3.7631056 2.1046525.1631419.4154338.1771317.8628528.0658085 1.2668398-.1166197.423208-.3688494.793324-.7132048 1.02565-.5063126.344021-2.054889.669759-4.3427823.828902-1.6166894.115855-6.3404596.155028-8.4932267.071382-3.9218221-.147803-6.6330354-.392137-10.2007729-.912516l-1.1247443-.162217c-.5870355.314916-1.0186943.747481-1.3228773 1.207146-.245238.365662-.4861218.587362-.7278613.714952zm19.8939266-21.3686411c2.6721452.044542 3.7774373.038113 7.3368518-.031896 4.2957231-.0885763 8.7598728-.4984513 11.7959138-1.0806141 1.488968-.2839863 2.813672-.6323499 3.677267-1.1045979-.470579-.2144276-1.109834-.4436503-1.751735-.6339091-3.1093903-.909054-7.1762256-1.4987902-12.8412411-1.8651777-1.712637-.1142505-9.7778525-.1075013-11.7008045.000323-6.4730171.3746297-12.1309628 1.0917254-17.6019151 2.2412144-.6961025.147287-1.5204597.3333584-2.3099031.5186334 7.6327417 1.1437084 15.7408218 1.8218276 23.3955662 1.956024zm13.5169151-24.0673525c6.0137265-.9373305 10.6048385-2.3857294 12.2846865-3.6654062-.151066-.1051214-.349042-.2246923-.537453-.3193146-1.881023-.9616701-5.474563-1.6465847-10.0320598-1.9454576-1.8741319-.1205712-8.7819912-.1006282-11.896427.0326891-14.8982372.6588703-26.2682057 2.2226683-36.2575823 5.0141827 2.7072773.6510399 6.2593054 1.2660902 9.4280922 1.6203061 5.9547439.667278 12.7884796.927599 19.2356213.730599 7.1725298-.2161282 12.6671957-.673035 17.7751221-1.4675985zm-12.2353804-19.472339c4.9077391-.1679978 9.1141502-.5329463 12.0277388-1.031527-.3957213-.0943797-.7975727-.1849204-1.169846-.2620136-6.4377159-1.3363257-13.1423831-1.7527839-20.6732855-1.2714839-4.4185019.2838002-8.7884141.8249341-12.8309429 1.5956983 3.1143966.4931332 6.7956612.8045395 11.6060192.988515 1.2550143.050908 9.4811551.0380185 11.0403164-.0191888z"
            fill="#363645"
            transform="matrix(.76604444 -.64278761 -.64278761 -.76604444 59.595584 163.737522)"
          />
          <animated.ellipse
            cx={x}
            cy={y}
            fill="url(#a)"
            rx="22.560811"
            ry="22.604167"
          />
        </g>
        <g fill="#363645" transform="translate(30.3 29.7)">
          <path d="m2.0129 41.6619c-.9885-1.1673-1.4056-2.6688-1.2383-4.8163l3.7398 1.1477c.0195.642.0766.9633.3198 1.2987.1383.1881.1759.2166.413.3215.4487.2039 1.4795.3123 2.2581.2657 1.3309-.0803 4.8473-.9194 4.8473-.9194l9.7548-4.0129s1.4749-.7528 2.1028-1.0875c4.9299-2.6361 9.7251-5.7236 14.9245-9.5974 1.5424-1.1534 7.725-6.3325 8.9636-7.5209 4.1041-3.922 6.8404-6.9879 8.638-9.683.3694-.5583.5906-1.1371.9344-1.6116l2.0384-4.47078c.8898.22998 1.6215.77788 2.0925 1.56718.6163 1.0328.7507 2.2546.3214 3.7439-.385 1.3358-1.2402 2.9088-2.5996 4.7713-1.5437 2.1049-3.5416 4.3561-6.0407 6.7987-3.1455 3.0754-7.7744 6.8934-12.0798 9.9693-7.7675 5.5453-16.5258 10.4183-23.5803 13.127l-1.0662.4124-3.7564 1.1345-3.4116.7672c-1.7471.2666-3.4785.2779-4.6096.0374-1.3788-.2933-2.2347-.7824-2.9659-1.6427z" />
          <path d="m4.2473 66.4812c-.8064-.8639-1.3999-1.989-1.768-3.3905l4.2731-.6631c.15.6554.355 1.147.6924 1.4939.325.334.7678.5191 1.3494.6322.9401.1852 2.5398.1111 4.1977-.1664 1.9885-.3382 5.9587-1.4603 8.5297-2.4275l8.0688-3.2745c9.4467-4.2827 19.1618-10.3932 30.998-19.4649 2.4715-1.8998 7.776-6.3248 9.1342-7.6218 3.2991-3.1585 5.6117-5.993 6.4345-7.9388.0835-.1936.1583-.4125.2065-.5901l2.3608-3.4017c.796.4667 1.3384 1.1274 1.6214 1.9339.2684.7652.301 1.6729.0556 2.6861-.3392 1.4261-1.8285 3.9849-3.6674 6.2566-2.3551 2.9102-4.8396 5.3018-9.4599 9.0946-7.7545 6.3646-16.4146 12.4515-23.9387 16.8416-5.5705 3.2494-11.5182 6.1274-16.7739 8.1154l-.9755.5255-6.1503 1.8739c-.9354.2775-2.1896.6274-3.0066.8178-3.8775.9131-6.9479 1.0739-9.0397.5081-1.2767-.3462-2.3209-.9607-3.1421-1.8403z" />
          <path d="m39.1991 76.0178c-8.5317 2.6756-14.8898 2.76-17.914.5024l2.8156-3.1833c.2662.2527.969.5301 1.541.652.6823.1472 2.0632.2406 2.9279.2012 3.136-.1377 7.3339-1.2102 12.1517-3.0802.874-.3438 1.6693-.6537 1.7613-.705l8.533-4.1659c3.5922-2.008 7.2875-4.4024 10.8547-7.0251 6.0784-4.4721 10.9468-9.1008 15.0194-14.2626.2356-.2983.4853-.626.7277-.9527l4.6829-5.9425c.441.1746.541.2281 1.0189.7977.452.5387.5081.6661.6097 1.1346.1202.5996.0421 1.3698-.2426 2.111-.9395 2.4723-5.4878 8.2438-10.181 12.8685-5.1792 5.1093-12.9563 10.8316-20.2348 14.8918-1.99 1.1091-5.2149 2.7202-6.7084 3.3518l-.0543.0455-3.7357 1.5315c-.9609.3492-2.8898 1.0162-3.573 1.2293z" />
        </g>
      </g>
    </Svg>
  )
}

const Svg = styled(animated.svg, {
  touchAction: 'none',

  variants: {
    large: {
      false: {
        width: '48px',
        height: '48px',

        '@tabletUp': {
          height: '64px',
          width: '64px',
        },
      },
      true: {
        width: '100%',
      },
    },
  },
})
