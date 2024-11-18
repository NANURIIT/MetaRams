package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS112BDTO;
import lombok.Getter;

@Getter
/*
 * 위원회안건내역 table(IBIMS112BDTO) VO
 */
public class IBIMS112BVO extends IBIMS112BDTO {
        private String jdgmDcdNm;
        private String mtrDcdNm;
        private String chrgPEno;
        private String chrgPEnm;
        private String ownPEno;
        private String ownPEnm;
        private String mtrNm;
        private String dprtCd;
        private String dprtNm;
}