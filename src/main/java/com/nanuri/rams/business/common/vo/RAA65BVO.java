package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.RAA65BDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@ToString
/*
 * 부실자산파일첨부정보 Table.RAA64B VO
 * */
public class RAA65BVO extends RAA65BDTO {
    /* 최초등록 정보 */
    private String rgstDt;                                     // 등록일자
    private String rgstTm;                                     // 등록시간
    private String fstRgstPEno;                                // 최초등록자사번
    /* 처리 정보*/
    private String hndlDyTm;                                   // 처리일시
    private String hndlDprtCd;                                 // 처리부점코드
    private String hndlPEno;                                   // 처리자사번

}
