using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class AccountMaGiamGium
{
    public Guid Id { get; set; }

    public Guid? AccountId { get; set; }

    public Guid? MagiamgiaId { get; set; }

    public virtual Account? Account { get; set; }

    public virtual MaGiamGium? Magiamgia { get; set; }
}
