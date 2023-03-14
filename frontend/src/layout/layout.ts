import { ColProps, RowProps } from "antd";
import { Gutter } from "antd/lib/grid/row";

export const mainGutters: [Gutter, Gutter] = [24, 16];
export const internalGutters: [Gutter, Gutter] = [16, 16];

export const mainColumnDesktopSpan = 16;
export const mainColumnMobileSpan = 24;

export const sideColumnDesktopSpan = 8;
export const sideColumnMobileSpan = 24;

export const labelColumn: ColProps = { span: 24 };

export const rowProps: RowProps = {
  gutter: mainGutters,
};

export const mainColumnProps: ColProps = {
  sm: mainColumnMobileSpan,
  md: mainColumnMobileSpan,
  lg: mainColumnMobileSpan,
  xxl: mainColumnDesktopSpan,
};

export const sideColumnProps: ColProps = {
  sm: sideColumnMobileSpan,
  md: sideColumnMobileSpan,
  lg: sideColumnMobileSpan,
  xxl: sideColumnDesktopSpan,
};

// CSS in JS
export const widthOneHundredPercent = { width: "100%" };