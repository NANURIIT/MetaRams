package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TB02020DTO {

    /* 워크플로우 기본 딜 정보 */
    private String wfId;              // 워크플로우 ID
    private String wfMapId;           // 워크플로우 맵ID
    private String wfStepId;          // 워크플로우 스텝ID
    private String excAuthCd;         // 예외권한코드
    private String nextStepId;        // 워크플로우 다음스텝ID
    private String rtnStepId;         // 워크플로우 반송스텝ID
    private String stepNm;            // 워크플로우 스텝명
    private String wfAuthId;          // 워크플로우 권한ID
    private String excAuthEmp;        // 예외권한 사원번호
    private String excAuthDept;       // 예외권한 부서코드
    private String wf01Count;         // WF01 카운트
    private String wf02Count;         // WF02 카운트
    private String wf03Count;         // WF03 카운트
  
    /* 워크플로우 맵 관리 정보 */
    private String aprvDttm;      // 결재일자
    private String dprtNm;        // 부서
    private String wfMapNm;       // 업무구분
    private String rtnYn;         // 결재구분
    private String memoCnts;      // 결재사유
    private String rreStep;       // 이전결재자
  
    /* 워크플로우 맵 이력  */
    private String empNm; //결재자이름
    private String rtnCnts; //반송사유

}
