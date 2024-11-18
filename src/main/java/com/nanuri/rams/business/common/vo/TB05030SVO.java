package com.nanuri.rams.business.common.vo;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
/*
 * 협의체 현황 및 결과조회 화면 VO
 */
public class TB05030SVO {
        private String cnsbDcd;
        private String cnsbDcdNm;
        private String rsltnYr;
        private String cnsbSq;
        private String sn;
        private String dealNo;
        private String jdgmDcd;
        private String jdgmDcdNm;
        private String mtrDcd;
        private String mtrNm;
        private String ptfdCrncyCd;
        private String ptfdCrncyCdNm;
        private BigDecimal ptfdAmt;
        private String mtrPrgSttsDcd;
        private String mtrPrgSttsDcdNm;
        private String rsltnRsltCd;
        private String rsltnRsltCdNm;
        private BigDecimal apvlAmt;
        private String sdnCndtF;
        private String sdnCndtCtns;
        private String etcCndtF;
        private String etcCndtCtns;
        private String riskRcgNo;
        private String cnsbOpnDt;
        private String cnsbOpnTm;
        private String dprtNm;
        private String chrgPEnm;
        private String ownPEnm;
}