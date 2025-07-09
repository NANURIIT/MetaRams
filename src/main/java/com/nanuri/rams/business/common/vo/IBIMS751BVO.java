package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS751BDTO;

import lombok.Getter;
import lombok.Setter;

/**
 * 한국신용정보원 - 신공공여정보
 * 2025.07.08 ejchoi
 */
@Getter
@Setter
public class IBIMS751BVO extends IBIMS751BDTO {
	List<IBIMS751BDTO> ibims751bVOList;

}
