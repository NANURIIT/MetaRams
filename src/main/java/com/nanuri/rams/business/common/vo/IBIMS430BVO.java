package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS430BDTO;
import com.nanuri.rams.business.common.dto.IBIMS435BDTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IBIMS430BVO extends IBIMS430BDTO {

    private String          prarDt;                 //입금예정일 == 상환예정일
    private String          paiRdmpDcd;             //상환구분코드
    private String          dprtCd;                 //부서코드
    private String          fromDt;                 //상환예정일 조회시작일 
    private String          toDt;                   //상환예정일 조회종료일
    private String          rgstDt;                 //등록일자

    private String          prdtCd;                 //종목코드
    private String          prcsDt;                 //처리일자
    private String          rgstEmpnm;              //등록자명
    private String          prcsCpltYn;             //상환여부
    
    private BigDecimal      istmDtmRdmpAmt;         //할부금액 == 할부일시상환금액
    private BigDecimal      nrmlIntr;               //정상이자금액
    private BigDecimal      intrAmtOvduIntr;        //이자금액연체이자     
    private BigDecimal      intrSmtlAmt;            //이자합계금액
    private BigDecimal      prarAmt;                //납입예정금액
    private BigDecimal      fee;                    //수수료
    private int             cnt;                    //실행건수
    private BigDecimal      rctmRfltAmt;            //본건제외금액
    private String          dealNm;                 //딜명      
    private boolean         chceYn;                 //처리여부       

    private List<IBIMS430BDTO> insertList;  // 입금내역매핑 저장리스트
    private List<IBIMS430BDTO> updateList;  // 입금내역매핑 수정리스트
    private List<IBIMS430BDTO> deleteList;  // 입금내역매핑 삭제리스트
    
}
