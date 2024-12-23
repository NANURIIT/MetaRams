package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS435BDTO;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IBIMS435BVO extends IBIMS435BDTO {

    private List<IBIMS435BDTO> insertList;  // 입금증등록내역 저장리스트
    private List<IBIMS435BDTO> updateList;  // 입금증등록내역 수정리스트
    private List<IBIMS435BDTO> deleteList;  // 입금증등록내역 삭제리스트
    
}
