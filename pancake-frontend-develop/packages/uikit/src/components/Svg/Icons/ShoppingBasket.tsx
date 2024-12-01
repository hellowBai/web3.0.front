import type React from "react";
import Svg from "../Svg";
import type { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <g id="shopping_basket">
        <mask id="mask0_3972_26025" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
          <rect id="Bounding box" x="0.125" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_3972_26025)">
          <path
            id="shopping_basket_2"
            d="M6.20406 20.8803C5.65841 20.8803 5.16475 20.7213 4.72306 20.4032C4.2814 20.085 3.9881 19.6637 3.84316 19.139L0.911662 9.47924C0.800045 9.08998 0.867129 8.7327 1.11291 8.40738C1.35868 8.08208 1.6916 7.91943 2.11166 7.91943H7.48121L10.7551 2.67053C10.9355 2.41183 11.1486 2.22198 11.3943 2.10096C11.6399 1.97994 11.8921 1.91943 12.1508 1.91943C12.4095 1.91943 12.6617 1.97994 12.9073 2.10096C13.153 2.22198 13.3577 2.41183 13.5215 2.67053L16.7704 7.91943H22.1399C22.56 7.91943 22.8929 8.08208 23.1387 8.40738C23.3845 8.7327 23.4515 9.08998 23.3399 9.47924L20.4508 19.1249C20.3059 19.659 20.0149 20.085 19.578 20.4032C19.141 20.7213 18.645 20.8803 18.0899 20.8803H6.20406ZM12.1311 16.3129C12.6652 16.3129 13.1167 16.1267 13.4856 15.7544C13.8544 15.382 14.0388 14.9287 14.0388 14.3946C14.0388 13.8604 13.8526 13.4089 13.4803 13.0401C13.1079 12.6713 12.6546 12.4868 12.1205 12.4868C11.5863 12.4868 11.1348 12.673 10.766 13.0454C10.3972 13.4178 10.2127 13.8711 10.2127 14.4052C10.2127 14.9393 10.3989 15.3908 10.7713 15.7597C11.1437 16.1285 11.597 16.3129 12.1311 16.3129ZM10.3128 7.91943H13.9388L12.1117 5.09228L10.3128 7.91943Z"
            fill="currentColor"
          />
        </g>
      </g>
    </Svg>
  );
};

export default Icon;
