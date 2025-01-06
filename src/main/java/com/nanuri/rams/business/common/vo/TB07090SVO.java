package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS435BDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class TB07090SVO {
    private List<IBIMS403BVO> rdmpPrarDtlsList;     //상환예정내역 list
    private List<IBIMS435BDTO> rctmDtlsList;        //입금증등록내역 list
    private List<IBIMS430BVO> dprtDtlsList;         //입금내역매핑 list
}
