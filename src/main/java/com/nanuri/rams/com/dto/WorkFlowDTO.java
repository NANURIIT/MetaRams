package com.nanuri.rams.com.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkFlowDTO {
    
    private String wfId;                //워크플로우ID
    private String wfMapId;             //워크플로우 맵ID
    private String wfStepId;            //워크플로우 스텝ID
    private String aprvEmpNo;           //결재자 사원번호
    private String aprvDttm;            //결재일시
    private String rtnYn;               //반송여부
    private String rtnCnts;             //반송사유
    private String excAuthCd;           //예외권한코드
    private String memoCnts;            //결재사유
    private String etc;                 //기타
    private String jobCnts;             //업무내역

    private String stepId;              //워크플로우 스텝ID
    private String nextStepId;          //다음스텝 ID
    private String rtnStepId;           //반송스텝 ID
    private String stepNm;              //스텝명
    private String wfAuthId;            //워크플로우 권한ID
    private String excAuthEmp;          //예외권한 사원번호
    private String excAuthDept;         //예외권한 부서코드

    private String wfMapNm;             //워크플로우 맵명
    private String jobTable;            //작업테이블명
    private String jobTableKey;         //작업테이블 KEY
    private String regDttm;             //등록일시
    private String regUserId;           //등록자
    private String chgDttm;             //변경일시
    private String chgUserId;           //변경자

    private String dealNo;              //딜번호
    private String lastYn;              //최종여부
    private String rqsDpt;              //신청부서
    private String empno;               //로그인 사원번호
    private String aprvEmpNm;           //신청자명

    private int wfMapCnt;               //WF 건수

    private List<String> pkList;        //pk값 


}
