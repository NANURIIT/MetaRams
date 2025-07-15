package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS754BDTO;

import lombok.Getter;
import lombok.Setter;

/**
 * 한국신용정보원 - 법인채무보증채무인수약정
 * 
 */
@Getter
@Setter
public class IBIMS754BVO extends IBIMS754BDTO {
	List<IBIMS754BDTO> ibims754bVOList;

}
