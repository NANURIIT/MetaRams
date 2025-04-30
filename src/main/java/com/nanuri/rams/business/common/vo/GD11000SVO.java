package com.nanuri.rams.business.common.vo;


import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS001BDTO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GD11000SVO {

    //검색조건추가필요
    private String         cmnsCdGrp;                              // 그룹코드명
    private String         cmnsCdGrpExpl;                          // 코드그룹설명

    List<IBIMS001BDTO> grpList;
    List<IBIMS002BVO> addList;
}

