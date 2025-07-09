package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS752BDTO;

import lombok.Getter;
import lombok.Setter;

/**
 * 한국신용정보원 - 한도정보
 * 2025.07.08 ejchoi
 */
@Getter
@Setter
public class IBIMS752BVO extends IBIMS752BDTO {
	List<IBIMS752BDTO> ibims752bVOList;

}
